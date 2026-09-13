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


    const titulo = document.querySelector(".conteudoArtigo h2");

    const paragrafos = document.querySelectorAll(".conteudoArtigo p");

    let texto = "";


    if (titulo) {
        texto += titulo.innerText + ". ";
    }


    paragrafos.forEach((paragrafo) => {
        texto += paragrafo.innerText + " ";
    });


    fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 1.25;
    fala.pitch = 1;
    fala.volume = 1;


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


    speechSynthesis.speak(fala);
}


speechSynthesis.onvoiceschanged = function() {
    speechSynthesis.getVoices();
};