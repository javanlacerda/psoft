const listagem = document.getElementById("listagem");

function listar (response){


    let mensagens = response.map(msg => `<ul class="card-javan"><li><h5><b>Author:</b> ${msg.author}</li> <li><h5><b>Título:</b> ${msg.title}</li> <li><h5><b>Mensagem:</b> ${msg.msg}</li></ul>`).join(" ");
    
    listagem.innerHTML = mensagens;
}

fetch("http://150.165.85.16:9900/api/msgs").then(response => response.json()).then(promisse => listar(promisse));