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

function gerarCartela(){
    return [gerarFileira(5, 1, 15), gerarFileira(5, 16, 30), gerarFileira(5, 31, 45), gerarFileira(5, 46, 60), gerarFileira(5, 61, 75)];
}

function gerarCartelaHTML() {

    let titulo = ['B', 'I', 'N', 'G', 'O'];
    let cartela = gerarCartela();

    let divBingo = document.getElementById("bingo");

    let divCartela = document.createElement("div");
    let table = document.createElement("table");
    let tr = document.createElement("tr");

    titulo.forEach(function (elemento) {
        let td = document.createElement("td");
        td.innerText = elemento;
        tr.appendChild(td);
    });

    table.appendChild(tr);

    for(let i = 0; i < 5; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < 5; j++){
            let td = document.createElement("td");
            if(i == 2 && j == 2){
                td.innerText = "X";
            }else{
                td.innerText = cartela[j][i]
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    divCartela.appendChild(table);
    divCartela.style = "display: inline;"
    divBingo.appendChild(divCartela);

}