//tipo do lembrete
type Reminder = {
    id: number;
    title: string;
    dueDate?: string;
    description?: string;
    createdAt: string;
};
let reminders: Reminder[] = [];
let nextId: number = 1;
let editingReminderId: number | null = null;

//Buscar lembrete
function findReminderById(id: number): Reminder | undefined {
    for (let i = 0; i < reminders.length; i++) {
      if (reminders[i].id === id) {
        return reminders[i];
      }
    }
    return undefined;
}

// Função para adicionar ou editar um lembrete
function saveReminder(title: string, dueDate?: string, description?: string) {
    if (editingReminderId !== null) {
      // Se estamos editando, atualizar o lembrete
      const reminder = findReminderById(editingReminderId);
      if (reminder) {
        reminder.title = title;
        reminder.dueDate = dueDate;
        reminder.description = description;
        renderReminders();
      }
      editingReminderId = null; // Resetar o ID após edição
      (document.getElementById('submitBtn') as HTMLButtonElement).textContent = "Adicionar Lembrete";
    } else {
      // Se não estamos editando, adicionar um novo lembrete
      addReminder(title, dueDate, description);
    }
}

//Adicionar lembrete
function addReminder(title: string, dueDate?: string, description?: string) {
    const newReminder: Reminder = {
      id: nextId++,
      title,
      dueDate,
      description,
      createdAt: new Date().toISOString(),
    };
    reminders.push(newReminder);
    renderReminders();
}

//Apagar um lembrete
function deleteReminder(id: number) {
    reminders = reminders.filter(rem => rem.id !== id);
    renderReminders();
}

// Iniciar a edição de um lembrete
function startEditingReminder(id: number) {
    const reminder = findReminderById(id);
    if (reminder) {
      (document.getElementById('title') as HTMLInputElement).value = reminder.title;
      (document.getElementById('dueDate') as HTMLInputElement).value = reminder.dueDate || '';
      (document.getElementById('description') as HTMLTextAreaElement).value = reminder.description || '';
      editingReminderId = reminder.id;
    
      (document.getElementById('submitBtn') as HTMLButtonElement).textContent = "Salvar Lembrete";
    }
}

//renderizar os lembretes
function renderReminders() {
    const todoList = document.getElementById('todoList')!;
    todoList.innerHTML = '';
    reminders.forEach(rem => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${rem.title}</strong> (Criado em: ${rem.createdAt})
                      ${rem.dueDate ? `| Data Limite: ${rem.dueDate}` : ""}
                      <button onclick="deleteReminder(${rem.id})">Deletar</button>
                      <button onclick="startEditingReminder(${rem.id})">Editar</button>`;
      todoList.appendChild(li);
    });
}

// Conectar ao formulário
const form = document.getElementById('todoForm') as HTMLFormElement;
form.onsubmit = function(event: Event) {
  event.preventDefault();
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const dueDate = (document.getElementById('dueDate') as HTMLInputElement).value;
  const description = (document.getElementById('description') as HTMLTextAreaElement).value;
  
  saveReminder(title, dueDate, description);
  form.reset();
};

  
  
  

  