let fala = null;
let falando = false;

function ouvirArtigo() {

    const botao = document.getElementById("botaoOuvir");

    if (falando) {

        speechSynthesis.cancel();

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";

        return;
    }


    // Título do artigo
    const titulo = document.querySelector(".conteudoArtigo h2");

    // Parágrafos do artigo
    const paragrafos = document.querySelectorAll(".conteudoArtigo p");

    let texto = "";


    // Adiciona o título primeiro
    if (titulo) {
        texto += titulo.innerText + ". ";
    }


    // Depois adiciona os parágrafos
    paragrafos.forEach((paragrafo) => {
        texto += paragrafo.innerText + " ";
    });


    // Cria a fala
    fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 1.25;
    fala.pitch = 1;
    fala.volume = 1;


    // Procura uma voz em português
    const vozes = speechSynthesis.getVoices();

    const vozGoogle = vozes.find((voz) =>
        voz.lang === "pt-BR" &&
        voz.name.toLowerCase().includes("google")
    );

    const vozPortugues = vozes.find((voz) =>
        voz.lang === "pt-BR"
    );


    if (vozGoogle) {
        fala.voice = vozGoogle;
    } else if (vozPortugues) {
        fala.voice = vozPortugues;
    }


    // Quando começar
    fala.onstart = function() {

        falando = true;

        botao.innerHTML = "■ &nbsp; PARAR";
    };


    // Quando terminar
    fala.onend = function() {

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";
    };


    // Caso aconteça algum erro
    fala.onerror = function() {

        falando = false;

        botao.innerHTML = "▷ &nbsp; OUVIR";
    };


    // Começa a leitura
    speechSynthesis.speak(fala);
}


// Carrega as vozes do navegador
speechSynthesis.onvoiceschanged = function() {
    speechSynthesis.getVoices();
};