let fala = null;
let falando = false;

function ouvirArtigo() {

    const botao = document.getElementById("botaoOuvir");

    // Se estiver falando, para a leitura
    if (falando) {

        speechSynthesis.cancel();

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";

        return;
    }


    let texto = "";


    // ==============================
    // PÁGINAS DE ARTIGO
    // ==============================

    const conteudoArtigo = document.querySelector(".conteudoArtigo");

    if (conteudoArtigo) {

        const titulo = conteudoArtigo.querySelector("h2");
        const paragrafos = conteudoArtigo.querySelectorAll("p");

        if (titulo) {
            texto += titulo.innerText + ". ";
        }

        paragrafos.forEach((paragrafo) => {
            texto += paragrafo.innerText + ". ";
        });

    }


    // ==============================
    // PÁGINA BLOG
    // ==============================

    const conteudoBlog = document.querySelector(".conteudoBlog");

    if (conteudoBlog) {

        const tituloBlog = document.querySelector(".ladoEsquerdo > h3");

        const paragrafosBlog = document.querySelectorAll(
            ".ladoEsquerdo > p"
        );

        const textoComplementar = document.querySelector(
            ".textoComplementar"
        );


        if (tituloBlog) {
            texto += tituloBlog.innerText + ". ";
        }


        paragrafosBlog.forEach((paragrafo) => {
            texto += paragrafo.innerText + ". ";
        });


        if (textoComplementar) {
            texto += textoComplementar.innerText + ". ";
        }

    }


    // Verifica se encontrou algum texto
    if (texto.trim() === "") {

        console.log("Nenhum texto encontrado para leitura.");

        return;
    }


    // ==============================
    // CONFIGURAÇÃO DA VOZ
    // ==============================

    fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";

    fala.rate = 0.92;

    fala.pitch = 0.95;

    fala.volume = 1;


    const vozes = speechSynthesis.getVoices();


    // Procura voz Google em português
    const vozGoogle = vozes.find((voz) =>
        voz.lang === "pt-BR" &&
        voz.name.toLowerCase().includes("google")
    );


    // Procura voz Microsoft em português
    const vozMicrosoft = vozes.find((voz) =>
        voz.lang === "pt-BR" &&
        voz.name.toLowerCase().includes("microsoft")
    );


    // Qualquer voz em português
    const vozPortugues = vozes.find((voz) =>
        voz.lang === "pt-BR"
    );


    if (vozGoogle) {
        fala.voice = vozGoogle;
    }
    else if (vozMicrosoft) {
        fala.voice = vozMicrosoft;
    }
    else if (vozPortugues) {
        fala.voice = vozPortugues;
    }


    // ==============================
    // EVENTOS
    // ==============================

    fala.onstart = function() {

        falando = true;

        botao.innerHTML = "■ &nbsp; PARAR";
    };


    fala.onend = function() {

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";
    };


    fala.onerror = function() {

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";
    };


    // Começa a leitura
    speechSynthesis.speak(fala);
}


// Carrega as vozes disponíveis
speechSynthesis.onvoiceschanged = function() {
    speechSynthesis.getVoices();
};