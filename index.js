let vetorJogadores = [];

function gerarNumeroAleatorio(inicioIntervalo, fimIntervalo) {
    return Math.floor((fimIntervalo - inicioIntervalo) * Math.random()) + inicioIntervalo;
}

function gerarFileira(quantidadeNumeros, inicio, fim) {
    let cartela = [];
    for (i = 0; i < quantidadeNumeros; i++) {
        let numeroCartelaExiste = true;
        while (numeroCartelaExiste == true) {
            let numeroAleatorio = gerarNumeroAleatorio(inicio, fim);
            if (cartela.includes(numeroAleatorio) == true) {
                numeroCartelaExiste = true;
            } else {
                numeroCartelaExiste = false;
                cartela.push(numeroAleatorio);
            }
        }
    }
    return cartela;
}

function gerarCartela() {
    return [gerarFileira(5, 1, 15), gerarFileira(5, 16, 30), gerarFileira(5, 31, 45), gerarFileira(5, 46, 60), gerarFileira(5, 61, 75)];
}

function gerarCartelaHTML() {

    let nomeJogador = prompt("Digite o nome do jogador:");
    if(nomeJogador == "" || nomeJogador == null){
        alert("Você precisa digitar o nome do jogador!!!");
        return;
    }else if(nomeJogador.length <= 5){
        alert("O nome é muito pequeno!!!");
        return;
    }

    let titulo = ['B', 'I', 'N', 'G', 'O'];
    let cartela = gerarCartela();

    let jogador = {
        nome: nomeJogador,
        cartela: cartela
    }

    vetorJogadores.push(jogador);
    console.log(vetorJogadores);

    let divBingo = document.getElementById("bingo");

    let h3nome = document.createElement("h3");
    h3nome.style = "text-align: center;"
    h3nome.innerText = nomeJogador;


    let divCartela = document.createElement("div");
    divCartela.appendChild(h3nome);
    divCartela.className = "col-4";
    let divTabela = document.createElement("div");
    divTabela.style = "display: flex; justify-content: center;"
    let table = document.createElement("table");
    table.className = "borda-tabela";
    let tr = document.createElement("tr");

    titulo.forEach(function (elemento) {
        let td = document.createElement("td");
        td.innerText = elemento;
        tr.appendChild(td);
    });

    table.appendChild(tr);

    for (let linha = 0; linha < 5; linha++) {
        let tr = document.createElement("tr");
        for (let coluna = 0; coluna < 5; coluna++) {
            let td = document.createElement("td");
            td.className = "borda-tabela";
            if (linha == 2 && coluna == 2) {
                td.innerText = "X";
            } else {
                td.innerText = cartela[coluna][linha];
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    divTabela.appendChild(table);
    divCartela.appendChild(divTabela);
    divCartela.style = "display: inline;"
    divBingo.appendChild(divCartela);

}

function verificaCartela(cartela, numerosSorteados, quantidadeNumeros) {
    if (numerosSorteados.length < quantidadeNumeros) {
        return false;
    }
    let numerosExistem = true;
    cartela.forEach(function (numero) {
        if (numerosSorteados.includes(numero) == true) {
            numerosExistem = true;
        } else {
            numerosExistem = false;
            return false;
        }
    });
    if (numerosExistem == true) {
        return true;
    }
}

function jogarBingo() {
    if(vetorJogadores.length < 2){
        alert("Você precisa ter pelo menos dois jogadores para jogar!!!");
        return;
    }
    let numerosSorteados = [];
    let divSorteados = document.getElementById("sorteados");
    let intervalo = setInterval(function () {
        let numeroExiste = true;
        while (numeroExiste == true) {
            let numeroAleatorio = gerarNumeroAleatorio(1, 75);
            if (numerosSorteados.includes(numeroAleatorio) == true) {
                numeroExiste = true;
            } else {
                numeroExiste = false;
                numerosSorteados.push(numeroAleatorio);
                let divNumero = document.createElement("div");
                divNumero.classList.add("col-2");
                divNumero.classList.add("sorteado");
                divNumero.innerText = numeroAleatorio;
                divSorteados.appendChild(divNumero);
                console.log("Números sorteados:", numerosSorteados);
                vetorJogadores.forEach(function (jogador) {
                    if (verificaCartela(jogador.cartela, numerosSorteados, 25) == true) {
                        console.log(`${jogador.nome} ganhou o BINGO! Parabénnnsssssss!!!!!!`);
                        clearInterval(intervalo);
                    }
                });
            }
        }
        if (numerosSorteados.length >= 75) {
            console.log("Sorteio Finalizado!");
            clearInterval(intervalo);
        }
    }, 1000);
}