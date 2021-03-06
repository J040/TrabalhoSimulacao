
var numVertices = 0;
var numArestas = 0;
var numArcos = 0;


//Dijkstra
var matrizDijkstra = [numVertices];

var grafo = {
    vertice: [],
    aresta: new Array,
    arco: new Array,
    isPonderado: false,
    isOrientado: false,
    exist: false
};

var criarGrafo = function (){
    if(!grafo.exist){
        grafo.exist = true;
        console.log("Grafo criado");
    }else{
        console.log("Já existe um grafo")
    }
};

var criarGrafoPonderado = function (){
    if(!grafo.exist){
        grafo.isPonderado = true;
        grafo.exist = true;
        console.log("Grafo criado");
    }else{
        console.log("Já existe um grafo")
    }
} ;

var criarGrafoOrientado = function (){
    if(!grafo.exist){
        grafo.isOrientado = true;
        grafo.exist = true;
        console.log("Grafo criado");
    }else{
        console.log("Já existe um grafo")
    }
};

var criarGrafoPonderadoOrientado = function (){
    if(!grafo.exist){
        grafo.isOrientado = true;
        grafo.isPonderado = true;
        grafo.exist = true;
        console.log("Grafo criado");
    }else{
        console.log("Já existe um grafo")
    }
};

var inserirVertice = function (nome){
    if(grafo.exist){
        if(retornarPosVertice(nome) == -1 || retornarPosVertice(nome) == undefined){
            grafo.vertice.push({nome: nome, vizinhos: [], cor: -1});
            numVertices++;
            console.log("Vertice inserido!");
        }else{
            console.log("Vertice existente!");
        }
    }else{
        console.log("Grafo não existe!");
    }
};

var retornarPosVertice = function(nome){
    for(var i = 0; i< grafo.vertice.length; i++){
        if(grafo.vertice[i].nome == nome){
            return i;
        }
    }
    return null;
};

var removerVertice = function (nome){
    if(numVertices == 0){
        console.log("Não existem vertices")
    }else{
        var index = grafo.vertice.indexOf(nome);
        grafo.vertice.splice(index,1);
        numVertices--;
        console.log("Vertice excluído!");
    }
};

var inserirAresta = function (origem, destino){
    if(!grafo.exist){
        console.log("Nenhum grafo existente!");
    }else if(numVertices <= 1){
        console.log("Numero de vertices menor do que o necessário!");
    }else if(grafo.isPonderado){
        console.log("Grafo ponderado. Impossível criar uma aresta sem o valor de peso");
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        if(existeAresta(grafo.vertice[index1].nome, grafo.vertice[index2].nome)){
            //chama a função existeAresta() e a função retorna o console.log (função detro do IF())
        }else if(grafo.vertice[index1] == undefined || grafo.vertice[index2] == undefined){
            console.log("Um dos vertices não existe no grafo");
        }else{
            grafo.aresta[numArestas] = [grafo.vertice[index1],grafo.vertice[index2]];
            numArestas++;

            grafo.vertice[index1].vizinhos.push({vizinho: grafo.vertice[index2].nome});
            grafo.vertice[index2].vizinhos.push({vizinho: grafo.vertice[index1].nome});

            console.log("Aresta inserida!");
        }
    }
};

var inserirArestaPonderada = function (origem, destino, peso){
    if(!grafo.exist){
        console.log("Nenhum grafo existente!");
    }else if(numVertices <= 1){
        console.log("Numero de vertices menor do que o necessário!");
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        if(existeAresta(grafo.vertice[index1].nome,grafo.vertice[index2].nome) == true){
            //chama a função existeAresta() e a função retorna o console.log (função detro do IF())
        }else if(grafo.vertice[index1] == undefined || grafo.vertice[index2] == undefined){
            console.log("Um dos vertices não existe no grafo");
        }else{
            grafo.aresta[numArestas] = [grafo.vertice[index1],grafo.vertice[index2], peso];
            numArestas++;

            grafo.vertice[index1].vizinhos.push({vizinho: grafo.vertice[index2].nome ,peso:  peso});
            grafo.vertice[index2].vizinhos.push({vizinho: grafo.vertice[index1].nome ,peso:  peso});

            console.log("Aresta inserida!");
        }
    }
};

var removerAresta = function (origem, destino){
    if(numArestas == 0){
        console.log("não existem arestas neste grafo")
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        for(var i = 0; i < numArestas; i++){
            if(grafo.aresta[i][0] == grafo.vertice[index1] && grafo.aresta[i][1] == grafo.vertice[index2]){
                grafo.aresta.splice(i, 1);
                console.log("Aresta removida");
                numArestas--;
            }else if(grafo.aresta[i][0] == grafo.vertice[index2] && grafo.aresta[i][1] == grafo.vertice[index1]){
                grafo.aresta.splice(i, 1);
                console.log("Aresta removida");
                numArestas--;
            }
        }
    }
};

var existeAresta = function(origem, destino){
    var index1 = retornarPosVertice(origem);
    var index2 = retornarPosVertice(destino);
    for(var i = 0; i < numArestas; i++){
        if(grafo.aresta[i][0] == grafo.vertice[index1] && grafo.aresta[i][1] == grafo.vertice[index2]){
            console.log("Existe Aresta");
            return true;
        }else if(grafo.aresta[i][0] == grafo.vertice[index2] && grafo.aresta[i][1] == grafo.vertice[index1]){
            console.log("Existe Aresta");
            return true;
        }else{
            return false;
        }
    }
};

var retornarAresta = function(origem, destino){
    var index1 = retornarPosVertice(origem);
    var index2 = retornarPosVertice(destino);
    for(var i = 0; i < numArestas; i++){
        if(grafo.aresta[i][0] == grafo.vertice[index1] && grafo.aresta[i][1] == grafo.vertice[index2]){
            grafo.aresta.splice(i, 1);
            console.log("Aresta removida");
            numArestas--;
        }else if(grafo.aresta[i][0] == grafo.vertice[index2] && grafo.aresta[i][1] == grafo.vertice[index1]){
            grafo.aresta.splice(i, 1);
            console.log("Aresta removida");
            numArestas--;
        }
    }
};

var inserirArco = function(origem, destino){
    if(!grafo.exist){
        console.log("Nenhum grafo existente!");
    }else if(numVertices <= 1){
        console.log("Numero de arcos menor do que o necessário!");
    }else if(grafo.isPonderado || grafo.isOrientado){
        console.log("Grafo é ponderado ou orientado")
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        if(grafo.vertice[index1] == undefined || grafo.vertice[index2] == undefined){
            console.log("Vertice não existe")
        }else{
            grafo.arco[numArcos] = [grafo.vertice[index1],grafo.vertice[index2]];
            numArcos++;
        }

    }
};


var inserirArcoPonderado = function(origem, destino, peso){
    if(!grafo.exist){
        console.log("Nenhum grafo existente!");
    }else if(numVertices <= 1){
        console.log("Numero de arcos menor do que o necessário!");
    }else if(!grafo.isPonderado || !grafo.isOrientado){
        console.log("Grafo não ponderado ou orientado")
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        if(grafo.vertice[index1] == undefined || grafo.vertice[index2] == undefined){
            console.log("Vertice não existe")
        }else{
            grafo.arco[numArcos] = [grafo.vertice[index1],grafo.vertice[index2], peso];
            numArcos++;
        }

    }
};

var existeArco = function(origem, destino){
    if(numArcos == 0){
        console.log("Não existem arcos neste grafo");
    }else{
        var index1 = retornarPosVertice(origem);
        var index2 = retornarPosVertice(destino);
        for(var i = 0; i < numArcos; i++){
            if(grafo.arco[i][0] == grafo.vertice[index1] && grafo.arco[i][1] == grafo.vertice[index2]){
                console.log("Existe Arco");
            }else{
                console.log("Não existe arco!");
            }
        }
    }
};

var imprimeGrafo = function(){
    console.log("ARESTAS");
    for(var i = 0; i < numArestas ; i++){
        console.log(grafo.aresta[i]);
    }
    console.log("\nARCOS");
    for(var i = 0; i < numArcos ; i++){
        console.log(grafo.arco[i]);
    }
};

var criarMatriz = function(){
    for(var i = 0; i < numVertices; i++){
        matrizDijkstra[i] = [i, 9999, null, false]; //[i, 9999, null, false]; <- bkp
    }
    console.log("Matriz Dijkstra Criada");
};


//DIJKSTRA
var fechados = [];
var abertos = [];
var atual = [];

var dijkstra = function(inicio){
    atual = matrizDijkstra[retornarPosVertice(inicio)];
    abertos = matrizDijkstra;
    abertos[0][3] = true;
    abertos.splice(retornarPosVertice(inicio),1);
    atual[1] = 0;
    fechados.push(atual);
    while(abertos.length > 0){
        var vizinhos =  grafo.vertice[atual[0]].vizinhos;
        for(var i = 0; i < vizinhos.length; i++){
            for(var j = 0; j < abertos.length; j++){
                if(abertos[j][0] == retornarPosVertice(vizinhos[i].vizinho)){
                    if(abertos[j][1] == 9999 || atual[1] + vizinhos[i].peso < abertos[j][1]){
                        abertos[j][1] = atual[1] + vizinhos[i].peso;
                        abertos[j][2] = atual[0];

                    }
                }
            }
        }

        var distancia = abertos[0][1]; //distancia do abertos[x] com menor distancia
        var indiceAberto = 0;
        for(var k = 1; k < abertos.length; k++){
            if(abertos[k][1] < distancia && abertos[k][1] < 9999){
                distancia = abertos[k][1];
                indiceAberto = k;
            }
        }
        atual = abertos[indiceAberto];
        atual[3] = true;
        abertos.splice(indiceAberto,1);

        fechados.push(atual);
    }
     fechados.sort(function(a, b) {
         return a[0] - b[0];
     });
};


//COLORAÇÃO

function coloracaoWP(){

    var vetor = [];
    for(var k = 0; k < numVertices; k++){
        grafo.vertice[k].cor = -1;
        vetor.push(k);
    }
    vetor.sort(function(a, b){
        return grafo.vertice[b].vizinhos.length
            - grafo.vertice[a].vizinhos.length;
    });

    var color = 0;
    var continuar = true;
    while(continuar){
        continuar = false;
        for(var i = 0; i < numVertices; i++){
            if(grafo.vertice[vetor[i]].cor == -1){
                var podeColorir = true;
                for(var j = 0; j < grafo.vertice[vetor[i]].vizinhos.length; j++){
                    var idVizinho = retornarPosVertice(grafo.vertice[vetor[i]].vizinhos[j].vizinho);
                    if(grafo.vertice[idVizinho].cor == color){
                        podeColorir = false;
                        break;
                    }
                }
                if(podeColorir){
                    grafo.vertice[vetor[i]].cor = color;
                }else{
                    continuar = true;
                }
            }
        }
        color++;
    }

};


var aEstrela = function(){

}


//COMANDOS
/*criarGrafoPonderado();
inserirVertice("A");
inserirVertice("B");
inserirVertice("C");
inserirVertice("D");
inserirVertice("E");
inserirVertice("F");

inserirArestaPonderada("A","B",4);
inserirArestaPonderada("A","C",5);
inserirArestaPonderada("A","D",6);
inserirArestaPonderada("D","E",5);
inserirArestaPonderada("D","F",7);

criarMatriz();

dijkstra("A");*/
//digitar "fechados" para retornar a matriz dijkstra


var existeNaFila = function(nome){

}

var existeNaPilha = function(nome){

}

var bfs = function(origem){ //largura sem destino

}

var bfs = function(origem, destino){ //largura sem destino

}

var dfs = function(origem){ //profundidade sem destino

}

var dfs = function(origem, destino){ //profundidade com destino

}
