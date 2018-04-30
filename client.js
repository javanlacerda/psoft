

const listagem = document.getElementById("listagem");
var filtradas = [];
var res = [];

function cadastrar() {
    var titulo = document.getElementById("title");
    var mensagem = document.getElementById("mensagem");
    var autor = document.getElementById("author");
    const login = document.getElementById("credential").value;
    const senha = document.getElementById("passcode").value;
    var credential = login + ":" + senha;

    fetch('http://150.165.85.16:9900/api/msgs', {
        method: 'POST',
        body: JSON.stringify({
            title: titulo.value,
            msg: mensagem.value,
            author: autor.value,
            credentials: credential
        })
    });
    if (title.value.trim() || "" && msg.value.trim() || "" && author.value.trim() != ""|| "" && login.trim() != ""|| "" && senha.trim() != "" ) {

        update({
            title: titulo.value,
            msg: mensagem.value,
            author: autor.value
        })
    } else {

        alert("Necessário preencher todos os campos!")
    }
    resetForm();
}

function resetForm(titulo, mensagem, autor) {

    document.getElementById("title").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("author").value = "";
    document.getElementById("deletar").value = "";
    document.getElementById("filtro").value = "";
}

function update(msg) {


    res.unshift
        (msg);
    listing(res);

}
fetch("http://150.165.85.16:9900/api/msgs").then(response => response.json()).then(guardaPromisse);

function listing(response) {

    response.sort(comparator)
    response.sort(comparator)
    response.sort(comparator)



    mensagens = response.map(msg => '<ul class="card-javan" ' + getRandomInt() + ` >${msg.id}
    <li style="color: #FFFFFF; padding: 0px 10px;" ><h5  style="font: italic bold 25px Purisa, sans-serif;"><b>front: ${msg.frontend}</b></li>

    <li style="color: #FFFFFF; padding: 0px 10px;" ><h5  style="font: italic bold 25px Purisa, sans-serif;"><b>Por: ${msg.author}</b></li>
    <li style="color: #FFFFFF;padding: 0px 10px;"><h5 style="font: italic bold 25px Purisa, sans-serif;"><b>Título: ${msg.title}</b></li>
    <li style="color: #FFFFFF;padding: 0px 20px;"><h5 style="font: italic bold 25px Purisa, sans-serif;"><b>Mensagem:${msg.msg}</b></li></ul>`).join(" ");
    watch();
    listagem.innerHTML = mensagens;

}

function guardaPromisse(promisse) {

    res = promisse;
    listing(promisse);

}

function getRandomInt() {
    min = Math.ceil(0);
    max = Math.floor(99999);
    return "style='background-color: #444444;'";
}

function filtering(value) {

    filtradas = res.filter(msg => verificaTexto(msg.author, value) || verificaTexto(msg.title, value) || verificaTexto(msg.msg, value) || msg.id == value);
    if (filtradas.length == 0) {

        listagem.innerHTML = "<h2 style='position: relative; text-align: center; color: #FFFFFF'> Nenhum resultado encontrado! </h2>"
    } else {

        listing(filtradas)
    }
}

function verificaTexto(texto, value) {

    const temp = texto.split(" ");

    let fils = temp.filter(element => element.toLowerCase() == value.toLowerCase());

    if (fils.length != 0) return true;

    return false;
}

function watch() {

    flag = document.getElementById("filtro").value.trim();

    setInterval(function () {

        let campo = document.getElementById("filtro").value.trim();
        if (campo != "" && campo != flag) {
            filtering(campo);
            flag = campo;

        } else if (campo == "" && flag != "") {
            flag = "";
            listing(res);
        }

    }, 100)


}

function deletar() {

    const idd = document.getElementById("deletar");
    const login = document.getElementById("credential").value;
    const senha = document.getElementById("passcode").value;
    var credential = login + ":" + senha;
        

    fetch('http://150.165.85.16:9900/api/msgs/' + idd.value, {
        method: 'DELETE',
        body: JSON.stringify({
            credentials: credential
        })
    });

    if (login.trim() == "" || "" && senha.trim() == "" ) {

    alert("Necessário preencher a credencial e senha para poder deletar uma mensagem!")
    
    } else {

    const index = res.map(msg => msg.id).indexOf(idd.value)

    res.splice(index, 1);

    listing(res);
    }
    resetForm();
}

function comparator(val1, val2) {

    if (val1.created_at > val2.created_at) {

        return -1;
    } else if (val1.created_at < val2.created_at) {

        return 1;

    } else {

        return 0;
    }

}

