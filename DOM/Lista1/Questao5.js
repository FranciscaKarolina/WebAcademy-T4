const itens = document.querySelectorAll('.lista-itens-2 li');

itens.forEach(item => {
    item.style.color = 'orange';
});

// Substituicao da classe "hot" pela classe "cold" da lista-2
itens.forEach(item => {
    if (item.classList.contains('hot')) {
        item.classList.remove('hot');
        item.classList.add('cold');
    }
});