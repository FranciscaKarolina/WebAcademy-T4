class Aluno {
    constructor(
        private id: number,
        private nomeCompleto: string,
        private idade: number,
        private altura: number,
        private peso: number
    ) {}

    public getId(): number { return this.id; }
    public getNomeCompleto(): string { return this.nomeCompleto; }
    public getIdade(): number { return this.idade; }
    public getAltura(): number { return this.altura; }
    public getPeso(): number { return this.peso; }
}

class Turma {
    private alunos: Aluno[] = [];

    public adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
        this.atualizarEstatisticas();
    }

    public editarAluno(id: number, novoAluno: Aluno): void {
        const index = this.alunos.findIndex(aluno => aluno.getId() === id);
        if (index !== -1) {
            this.alunos[index] = novoAluno;
            this.atualizarEstatisticas();
        }
    }

    public removerAluno(id: number): void {
        this.alunos = this.alunos.filter(aluno => aluno.getId() !== id);
        this.atualizarEstatisticas();
    }

    public getNumAlunos(): number {
        return this.alunos.length;
    }

    public getMediaIdades(): number {
        const total = this.alunos.reduce((soma, aluno) => soma + aluno.getIdade(), 0);
        return this.alunos.length ? total / this.alunos.length : 0;
    }

    public getMediaAlturas(): number {
        const total = this.alunos.reduce((soma, aluno) => soma + aluno.getAltura(), 0);
        return this.alunos.length ? total / this.alunos.length : 0;
    }

    public getMediaPesos(): number {
        const total = this.alunos.reduce((soma, aluno) => soma + aluno.getPeso(), 0);
        return this.alunos.length ? total / this.alunos.length : 0;
    }

    public atualizarEstatisticas(): void {
        document.getElementById('numAlunos')!.textContent = `Número de alunos: ${this.getNumAlunos()}`;
        document.getElementById('mediaIdades')!.textContent = `Média de idades: ${this.getMediaIdades().toFixed(2)}`;
        document.getElementById('mediaAlturas')!.textContent = `Média de alturas: ${this.getMediaAlturas().toFixed(2)}`;
        document.getElementById('mediaPesos')!.textContent = `Média de pesos: ${this.getMediaPesos().toFixed(2)}`;
    }

    public listarAlunos(): void {
        const alunosList = document.getElementById('alunosList')!;
        alunosList.innerHTML = '';
        this.alunos.forEach(aluno => {
            const li = document.createElement('li');
            li.textContent = `${aluno.getNomeCompleto()} - Idade: ${aluno.getIdade()}, Altura: ${aluno.getAltura()}m, Peso: ${aluno.getPeso()}kg`;
            alunosList.appendChild(li);
        });
    }
}

const turma = new Turma();
let alunoId = 1;

document.getElementById('alunoForm')!.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const idade = +(document.getElementById('idade') as HTMLInputElement).value;
    const altura = +(document.getElementById('altura') as HTMLInputElement).value;
    const peso = +(document.getElementById('peso') as HTMLInputElement).value;

    const aluno = new Aluno(alunoId++, nome, idade, altura, peso);
    turma.adicionarAluno(aluno);

    turma.listarAlunos();
    turma.atualizarEstatisticas();

    (document.getElementById('alunoForm') as HTMLFormElement).reset();
});
