function abrirMenu(){

    const menu = document.getElementById("menuLateral");
    const fundo = document.getElementById("fundoMenu");

    menu.classList.add("ativo");
    fundo.classList.add("ativo");
}


function fecharMenu(){

    const menu = document.getElementById("menuLateral");
    const fundo = document.getElementById("fundoMenu");

    menu.classList.remove("ativo");
    fundo.classList.remove("ativo");
}