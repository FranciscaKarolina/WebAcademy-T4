"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Classe Aluno
class Aluno {
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
    // Getters
    getId() { return this.id; }
    getNomeCompleto() { return this.nomeCompleto; }
    getIdade() { return this.idade; }
    getAltura() { return this.altura; }
    getPeso() { return this.peso; }
    // Setters 
    setNomeCompleto(nome) { this.nomeCompleto = nome; }
    setIdade(idade) { this.idade = idade; }
    setAltura(altura) { this.altura = altura; }
    setPeso(peso) { this.peso = peso; }
}
// Classe Turma
class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    adicionarOuAtualizarAluno(aluno) {
        const index = this.alunos.findIndex(a => a.getId() === aluno.getId());
        if (index !== -1) {
            this.alunos[index] = aluno; // Atualiza o aluno existente
        }
        else {
            this.alunos.push(aluno); // Adiciona um novo aluno
        }
        this.atualizarEstatisticas();
        this.listarAlunos();
    }
    // Remover aluno
    removerAluno(id) {
        this.alunos = this.alunos.filter(aluno => aluno.getId() !== id);
        this.atualizarEstatisticas();
        this.listarAlunos();
    }
    // Método para buscar aluno por ID
    buscarAlunoPorId(id) {
        return this.alunos.find(aluno => aluno.getId() === id);
    }
    // Retorna número de alunos
    getNumAlunos() {
        return this.alunos.length;
    }
    // calcular médias 
    calcularMedia(callback) {
        const total = this.alunos.reduce((soma, aluno) => soma + callback(aluno), 0);
        return this.alunos.length ? +(total / this.alunos.length).toFixed(2) : 0;
    }
    // Calcula média das idades
    getMediaIdades() {
        return this.calcularMedia(aluno => aluno.getIdade());
    }
    // Calcula média das alturas
    getMediaAlturas() {
        return this.calcularMedia(aluno => aluno.getAltura());
    }
    // Calcula média dos pesos
    getMediaPesos() {
        return this.calcularMedia(aluno => aluno.getPeso());
    }
    // Atualiza as estatísticas no HTML
    atualizarEstatisticas() {
        document.getElementById('numAlunos').textContent = `Número de alunos: ${this.getNumAlunos()}`;
        document.getElementById('mediaIdades').textContent = `Média de idades: ${this.getMediaIdades()}`;
        document.getElementById('mediaAlturas').textContent = `Média de alturas: ${this.getMediaAlturas()}m`;
        document.getElementById('mediaPesos').textContent = `Média de pesos: ${this.getMediaPesos()}kg`;
    }
    // Listar os alunos no HTML
    listarAlunos() {
        const alunosList = document.getElementById('alunosList');
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
let alunoAtual; //Controlar a edição
// Função para carregar aluno no formulário para edição
const carregarAlunoNoFormulario = (id) => {
    const aluno = turma.buscarAlunoPorId(id);
    if (aluno) {
        alunoAtual = aluno; // Define o aluno atual que está sendo editado
        document.getElementById('nome').value = aluno.getNomeCompleto();
        document.getElementById('idade').value = aluno.getIdade().toString();
        document.getElementById('altura').value = aluno.getAltura().toString();
        document.getElementById('peso').value = aluno.getPeso().toString();
    }
};
// Função para obter os dados do formulário e criar ou atualizar um aluno
const obterDadosDoFormulario = () => {
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    if (alunoAtual) {
        // Atualizando os dados do aluno existente
        alunoAtual.setNomeCompleto(nome);
        alunoAtual.setIdade(idade);
        alunoAtual.setAltura(altura);
        alunoAtual.setPeso(peso);
        return alunoAtual;
    }
    else {
        // Criando um novo aluno
        return new Aluno(alunoId++, nome, idade, altura, peso);
    }
};
// Manipulação do formulário
document.getElementById('alunoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Cria ou atualiza um aluno a partir dos dados do formulário
    const aluno = obterDadosDoFormulario();
    // Adiciona ou atualiza o aluno na turma
    turma.adicionarOuAtualizarAluno(aluno);
    // Limpa o formulário e o controle de edição
    alunoAtual = undefined;
    document.getElementById('alunoForm').reset();
});
// Desafio: Gerar alunos automaticamente usando a API randomuser.me
const gerarAlunoAutomaticamente = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://randomuser.me/api/');
        const data = yield response.json();
        const usuario = data.results[0];
        const nome = `${usuario.name.first} ${usuario.name.last}`;
        const idade = usuario.dob.age;
        const altura = +(Math.random() * (1.9 - 1.5) + 1.5).toFixed(2); // Gera altura entre 1.50m e 1.90m
        const peso = +(Math.random() * (100 - 50) + 50).toFixed(1); // Gera peso entre 50kg e 100kg
        const aluno = new Aluno(alunoId++, nome, idade, altura, peso);
        turma.adicionarOuAtualizarAluno(aluno);
    }
    catch (error) {
        console.error('Erro ao gerar aluno automaticamente:', error);
    }
});
// Botão para gerar aluno automaticamente
document.getElementById('gerarAlunoBtn').addEventListener('click', gerarAlunoAutomaticamente);
