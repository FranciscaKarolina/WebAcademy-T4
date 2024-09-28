"use strict";
let reminders = [];
let nextId = 1;
let editingReminderId = null;
//Buscar lembrete
function findReminderById(id) {
    for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].id === id) {
            return reminders[i];
        }
    }
    return undefined;
}
// Função para adicionar ou editar um lembrete
function saveReminder(title, dueDate, description) {
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
        document.getElementById('submitBtn').textContent = "Adicionar Lembrete";
    }
    else {
        // Se não estamos editando, adicionar um novo lembrete
        addReminder(title, dueDate, description);
    }
}
//Adicionar lembrete
function addReminder(title, dueDate, description) {
    const newReminder = {
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
function deleteReminder(id) {
    reminders = reminders.filter(rem => rem.id !== id);
    renderReminders();
}
// Iniciar a edição de um lembrete
function startEditingReminder(id) {
    const reminder = findReminderById(id);
    if (reminder) {
        document.getElementById('title').value = reminder.title;
        document.getElementById('dueDate').value = reminder.dueDate || '';
        document.getElementById('description').value = reminder.description || '';
        editingReminderId = reminder.id;
        document.getElementById('submitBtn').textContent = "Salvar Lembrete";
    }
}
//renderizar os lembretes
function renderReminders() {
    const todoList = document.getElementById('todoList');
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
const form = document.getElementById('todoForm');
form.onsubmit = function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('dueDate').value;
    const description = document.getElementById('description').value;
    saveReminder(title, dueDate, description);
    form.reset();
};
