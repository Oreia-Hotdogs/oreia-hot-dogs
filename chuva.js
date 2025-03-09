// Função para criar as imagens que vão cair
function iniciarChuva(item) {
    const chuva = document.getElementById('chuva');

    // Limpa qualquer item da chuva antes de iniciar
    chuva.innerHTML = '';

    // Definindo o número de itens da chuva
    for (let i = 0; i < 20; i++) {
        const img = document.createElement('img');
        img.src = item; // Define a imagem (chuvadog ou chuvax)
        img.style.left = `${Math.random() * 100}vw`; // Posiciona aleatoriamente na largura
        img.style.animationDelay = `${Math.random() * 5}s`; // Faz com que a queda aconteça em momentos aleatórios
        chuva.appendChild(img);
    }
}

// Quando a página carregar, começa a chuva de hotdogs ou burgers
window.onload = function() {
    // Verificando se a URL contém 'hotdog' ou 'burger'
    if (window.location.pathname.includes("hotdog")) {
        iniciarChuva("imagens/chuvadog.jpg"); // Quando estiver na página de Hotdog
    } else if (window.location.pathname.includes("burger")) {
        iniciarChuva("imagens/chuvax.jpg"); // Quando estiver na página de Burger
    }
};
