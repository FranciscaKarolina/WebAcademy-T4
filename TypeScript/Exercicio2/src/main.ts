// Classe Aluno
class Aluno {
    constructor(
        private id: number, 
        private nomeCompleto: string, 
        private idade: number, 
        private altura: number, 
        private peso: number
    ){}

    // Getters
    public getId(): number { return this.id; }
    public getNomeCompleto(): string { return this.nomeCompleto; }
    public getIdade(): number { return this.idade; }
    public getAltura(): number { return this.altura; }
    public getPeso(): number { return this.peso; }

    // Setters 
    public setNomeCompleto(nome: string): void { this.nomeCompleto = nome; }
    public setIdade(idade: number): void { this.idade = idade; }
    public setAltura(altura: number): void { this.altura = altura; }
    public setPeso(peso: number): void { this.peso = peso; }
}

// Classe Turma
class Turma {
    private alunos: Aluno[] = [];

    constructor(private id: number, private nome: string){}

    public adicionarOuAtualizarAluno(aluno: Aluno): void {
        const index = this.alunos.findIndex(a => a.getId() === aluno.getId());
        if (index !== -1) {
            this.alunos[index] = aluno; // Atualiza o aluno existente
        } else {
            this.alunos.push(aluno); // Adiciona um novo aluno
        }
        this.atualizarEstatisticas();
        this.listarAlunos();
    }

    // Remover aluno
    public removerAluno(id: number): void {
        this.alunos = this.alunos.filter(aluno => aluno.getId() !== id);
        this.atualizarEstatisticas();
        this.listarAlunos();
    }

    // Método para buscar aluno por ID
    public buscarAlunoPorId(id: number): Aluno | undefined {
        return this.alunos.find(aluno => aluno.getId() === id);
    }

    // Retorna número de alunos
    public getNumAlunos(): number {
        return this.alunos.length;
    }

    // calcular médias 
    private calcularMedia(callback: (aluno: Aluno) => number): number {
        const total = this.alunos.reduce((soma, aluno) => soma + callback(aluno), 0);
        return this.alunos.length ? +(total / this.alunos.length).toFixed(2) : 0;
    }

    // Calcula média das idades
    public getMediaIdades(): number {
        return this.calcularMedia(aluno => aluno.getIdade());
    }

    // Calcula média das alturas
    public getMediaAlturas(): number {
        return this.calcularMedia(aluno => aluno.getAltura());
    }    

    // Calcula média dos pesos
    public getMediaPesos(): number {
        return this.calcularMedia(aluno => aluno.getPeso());
    }

    // Atualiza as estatísticas no HTML
    public atualizarEstatisticas(): void {
        (document.getElementById('numAlunos') as HTMLElement).textContent = `Número de alunos: ${this.getNumAlunos()}`;
        (document.getElementById('mediaIdades') as HTMLElement).textContent = `Média de idades: ${this.getMediaIdades()}`;
        (document.getElementById('mediaAlturas') as HTMLElement).textContent = `Média de alturas: ${this.getMediaAlturas()}m`;
        (document.getElementById('mediaPesos') as HTMLElement).textContent = `Média de pesos: ${this.getMediaPesos()}kg`;
    }

    // Listar os alunos no HTML
    public listarAlunos(): void {
        const alunosList = document.getElementById('alunosList') as HTMLElement;
        alunosList.innerHTML = ''; 

        this.alunos.forEach(aluno => {
            const li = document.createElement('li');
            li.textContent = `${aluno.getNomeCompleto()} - Idade: ${aluno.getIdade()}, Altura: ${aluno.getAltura()}m, Peso: ${aluno.getPeso()}kg`;

            // Botão de Editar
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => carregarAlunoNoFormulario(aluno.getId());

            // Botão de Remover
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => this.removerAluno(aluno.getId());

            li.appendChild(btnEditar);
            li.appendChild(btnRemover);
            alunosList.appendChild(li);
        });
    }
}

// Instância da turma
const turma = new Turma(1, "turma de Educação Física");
let alunoId = 1; // Gerador de ID único
let alunoAtual: Aluno | undefined; //Controlar a edição

// Função para carregar aluno no formulário para edição
const carregarAlunoNoFormulario = (id: number): void => {
    const aluno = turma.buscarAlunoPorId(id);
    if (aluno) {
        alunoAtual = aluno; // Define o aluno atual que está sendo editado
        (document.getElementById('nome') as HTMLInputElement).value = aluno.getNomeCompleto();
        (document.getElementById('idade') as HTMLInputElement).value = aluno.getIdade().toString();
        (document.getElementById('altura') as HTMLInputElement).value = aluno.getAltura().toString();
        (document.getElementById('peso') as HTMLInputElement).value = aluno.getPeso().toString();
    }
};

// Função para obter os dados do formulário e criar ou atualizar um aluno
const obterDadosDoFormulario = (): Aluno => {
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const idade = parseInt((document.getElementById('idade') as HTMLInputElement).value);
    const altura = parseFloat((document.getElementById('altura') as HTMLInputElement).value);
    const peso = parseFloat((document.getElementById('peso') as HTMLInputElement).value);

    if (alunoAtual) {
        // Atualizando os dados do aluno existente
        alunoAtual.setNomeCompleto(nome);
        alunoAtual.setIdade(idade);
        alunoAtual.setAltura(altura);
        alunoAtual.setPeso(peso);
        return alunoAtual;
    } else {
        // Criando um novo aluno
        return new Aluno(alunoId++, nome, idade, altura, peso);
    }
};

// Manipulação do formulário
document.getElementById('alunoForm')!.addEventListener('submit', function (event) {
    event.preventDefault();

    // Cria ou atualiza um aluno a partir dos dados do formulário
    const aluno = obterDadosDoFormulario();

    // Adiciona ou atualiza o aluno na turma
    turma.adicionarOuAtualizarAluno(aluno);

    // Limpa o formulário e o controle de edição
    alunoAtual = undefined;
    (document.getElementById('alunoForm') as HTMLFormElement).reset();
});

// Desafio: Gerar alunos automaticamente usando a API randomuser.me
const gerarAlunoAutomaticamente = async (): Promise<void> => {
    try{
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const usuario = data.results[0];

        const nome = `${usuario.name.first} ${usuario.name.last}`;
        const idade = usuario.dob.age;
        const altura = +(Math.random() * (1.9 - 1.5) + 1.5).toFixed(2); // Gera altura entre 1.50m e 1.90m
        const peso = +(Math.random() * (100 - 50) + 50).toFixed(1); // Gera peso entre 50kg e 100kg

        const aluno = new Aluno(alunoId++, nome, idade, altura, peso);
        turma.adicionarOuAtualizarAluno(aluno);
    }catch (error){
        console.error('Erro ao gerar aluno automaticamente:', error);
    }
};

// Botão para gerar aluno automaticamente
document.getElementById('gerarAlunoBtn')!.addEventListener('click', gerarAlunoAutomaticamente);