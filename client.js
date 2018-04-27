const listagem = document.getElementById("listagem");
var mensagens = [];


function cadastrar() {
    var titulo = document.getElementById("title");
    var mensagem = document.getElementById("mensagem");
    var autor = document.getElementById("author");

    fetch('http://150.165.85.16:9900/api/msgs', {
        method: 'POST',
        body: JSON.stringify({
            title: titulo.value,
            msg: mensagem.value,
            author: autor.value,
            credentials: "javan:j@van123"
        })
    });
    if (title.value.trim() || "" && msg.value.trim() || "" && author.value.trim() != "") {

        update({
        title: titulo.value,
        msg: mensagem.value,
        author: autor.value
    })} else {

        alert("Necessário preencher todos os campos!")
    }
resetForm(titulo, mensagem, autor);
}

function resetForm(titulo, mensagem, autor) {
    titulo.value = '';
    mensagem.value = '';
    autor.value = '';
}
function update(msg) {

    mensagens += `<ul class="card-javan"><li><h5><b>Autor:</b> ${msg.author}</li> <li><h5><b>Título:</b> ${msg.title}</li> <li><h5><b>Mensagem:</b> ${msg.msg}</li></ul>`;
    listagem.innerHTML = mensagens;

}
fetch("http://150.165.85.16:9900/api/msgs").then(response => response.json()).then(promisse => listing(promisse));

function listing(response) {

    mensagens = response.map(msg => `<ul class="card-javan"><li><h5><b>Autor:</b> ${msg.author}</li> <li><h5><b>Título:</b> ${msg.title}</li> <li><h5 style="position: relative;"><b>Mensagem:</b> ${msg.msg}</li></ul>`).join(" ");

    listagem.innerHTML = mensagens;
}




