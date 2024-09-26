document.getElementById('lorem-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const paragraphs = document.getElementById('paragraphs').value;


    // Faz a requisição para o servidor
    const response = await fetch(`/lorem?x=${paragraphs}`);
    const text = await response.text();

    // Exibe o resultado na página
    document.getElementById('output').innerHTML = `<pre>${text}</pre>`;
});
