document.addEventListener("DOMContentLoaded", () => {
    aplicarCoresSalvas();
    configurarPainelADM();
    configurarBotaoSalvarCores();
});

function aplicarCoresSalvas() {
    const cores = JSON.parse(localStorage.getItem("coresSite"));
    if (!cores) return;

    document.body.style.backgroundColor = cores.fundo;
    document.body.style.color = cores.texto;

    const botoes = document.querySelectorAll("button");
    botoes.forEach(btn => {
        btn.style.backgroundColor = cores.botao;
        btn.style.color = "black";
    });

    document.getElementById("corFundo").value = cores.fundo;
    document.getElementById("corBotao").value = cores.botao;
    document.getElementById("corTexto").value = cores.texto;
}

function configurarBotaoSalvarCores() {
    document.getElementById("salvarCores").addEventListener("click", () => {
        const corFundo = document.getElementById("corFundo").value;
        const corBotao = document.getElementById("corBotao").value;
        const corTexto = document.getElementById("corTexto").value;

        const cores = {
            fundo: corFundo,
            botao: corBotao,
            texto: corTexto
        };

        localStorage.setItem("coresSite", JSON.stringify(cores));
        aplicarCoresSalvas();
        alert("Cores salvas com sucesso!");
    });
}

function configurarPainelADM() {
    const btnAnunciar = document.getElementById("anunciar");
    const btnRemover = document.getElementById("remover");
    const btnHistorico = document.getElementById("historico");
    const btnRedefinirCores = document.getElementById("redefinirCores");
    const btnSair = document.getElementById("sair");

    btnAnunciar.addEventListener("click", () => {
        const anuncio = prompt("Digite o novo anúncio:");
        if (anuncio) {
            localStorage.setItem("anuncioAtual", anuncio);

            let historico = JSON.parse(localStorage.getItem("historicoAnuncios")) || [];
            historico.push(`${new Date().toLocaleString()}: ${anuncio}`);
            localStorage.setItem("historicoAnuncios", JSON.stringify(historico));

            alert("Anúncio salvo com sucesso!");
        }
    });

    btnRemover.addEventListener("click", () => {
        localStorage.removeItem("anuncioAtual");
        alert("Anúncio removido.");
    });

    btnHistorico.addEventListener("click", () => {
        const historico = JSON.parse(localStorage.getItem("historicoAnuncios")) || [];
        if (historico.length === 0) {
            alert("Nenhum histórico disponível.");
        } else {
            alert("Histórico de anúncios:\n\n" + historico.join("\n"));
        }
    });

    btnRedefinirCores.addEventListener("click", () => {
        localStorage.removeItem("coresSite");
        aplicarCoresSalvas();
        alert("Cores redefinidas.");
    });

    btnSair.addEventListener("click", () => {
        localStorage.clear();
        alert("Você saiu e todos os dados foram apagados.");
        location.reload();
    });
}
