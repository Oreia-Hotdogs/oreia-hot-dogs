
// Hover nos botões
function aplicarHoverNosBotoes() {
    const buttons = document.querySelectorAll(".botao");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.boxShadow = "0px 0px 15px rgba(255, 204, 0, 0.8)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.boxShadow = "none";
        });
    });
}

// Botão do minigame
function configurarBotaoMinigame() {
    const botaoMinigame = document.querySelector(".jogo-btn");
    if (botaoMinigame) {
        botaoMinigame.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Minigame do Oreia em manutenção no momento! 🛠️");
        });
    }
}

