document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".botao");
    
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.boxShadow = "0px 0px 15px rgba(255, 204, 0, 0.8)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.boxShadow = "none";
        });
    });
});
