let ufam = {
    nome: "Universidade Federal do Amazonas",
    fundacao: 1909,
    ativa: true
};

document.writeln(ufam.nome);
document.writeln(ufam.fundacao); 
document.writeln(ufam.ativa);     

document.writeln("<br>");

document.writeln(ufam["nome"]);    
document.writeln(ufam["fundacao"]);
document.writeln(ufam["ativa"]);
