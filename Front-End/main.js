
var tam = 15;

var matriz = new Array(tam);

for (var i = 0; i < tam; i++) {
    matriz[i] = new Array(tam);
    for (var j = 0; j < tam; j++) {
        matriz[i][j] = 0;
    }    
}

$('#apagar').on('click', function () {
    type = 0;
});

$('#inicio').on('click', function () {
    type = 1;
});

$('#fim').on('click', function () {
    type = 2;
});

$('#parede').on('click', function () {
    type = 3;
});


var canvas = document.getElementById("canvas");
var my_context = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 700;

//my_context.rect(0, 0, 225, 225);
my_context.stroke();
my_context.fillStyle = "white";
my_context.backgroundColor = "green";

var xvalue = 0;
var yvalue = 0;

for (var y = 0; y < tam; y++) {
  for (var x = 0; x < tam; x++) {
    my_context.fillRect(xvalue, yvalue, 40, 40);
    xvalue += 41;
  }
  xvalue = 0;
  yvalue += 41;
}

var type = 3;
var jaTemInicio = false;
var jaTemFim = false;
var inicio;
var fim;


var clicking = false;

$(canvas).mousedown(function(e){
    clicking = true;
    var x = e.offsetX - 30;
    var y = e.offsetY - 30;
    
    for (var i = 0;  i < tam; i++) {
        for (var j = 0;  j < tam; j++) {
            if(x >= i * 40 && x <= ((i + 1) * 40) && y >= j * 40 && y <= ((j + 1) * 40)){ 

            switch(type){
            case 0:
                my_context.fillStyle = "white";
                if(  matriz[j][i] == 1){
                    jaTemInicio = false;
                }
                if(  matriz[j][i] == 2){
                    jaTemFim = false;
                }
                matriz[j][i] = 0;
                break;
            case 1:
                my_context.fillStyle = "green";
              
                if(jaTemInicio){
                    return;
                }
                jaTemInicio = true;
                
                matriz[j][i] = 1;
                inicio = (j * matriz.length) + i;
                console.log(inicio)    
                break;
            case 2:
                my_context.fillStyle = "red";
              
                if(jaTemFim){
                    return;
                }
                jaTemFim = true;
                matriz[j][i] = 2;
                fim = (j * matriz.length) + i;
                console.log(fim)    
                break;
            case 3:
                my_context.fillStyle = "grey";
                matriz[j][i] = 3;
                break;            
            }

                // if(matriz[j][i] == 1){
                //     return;
                // }
                my_context.fillRect(i *40 + i, j * 40 + j , 40, 40);
                return;
            }
        }
    }

    
});

$(document).mouseup(function(){
    clicking = false;
})

$(canvas).mousemove(function(e){
    if(clicking == false) return;

    var x = e.offsetX - 30;
    var y = e.offsetY - 30;
    
    for (var i = 0;  i < tam; i++) {
        for (var j = 0;  j < tam; j++) {
            if(x >= i * 40 && x <= ((i + 1) * 40) && y >= j * 40 && y <= ((j + 1) * 40)){ 

            switch(type){
            case 0:
                my_context.fillStyle = "white";
                if(  matriz[j][i] == 1){
                    jaTemInicio = false;
                }
                if(  matriz[j][i] == 2){
                    jaTemFim = false;
                }
                matriz[j][i] = 0;
                break;
            case 1:
                my_context.fillStyle = "green";
                
                if(jaTemInicio){
                    return;
                }
                jaTemInicio = true;
                
                
                matriz[j][i] = 1;
                inicio = (j * matriz.length) + i;
                console.log(inicio)                
                
                
                break;
            case 2:
                my_context.fillStyle = "red";
                
                if(jaTemFim){
                    return;
                }
                jaTemFim = true;
                
                matriz[j][i] = 2;
                fim = (j * matriz.length) + i;
                console.log(fim)                
                break;
            case 3:
                my_context.fillStyle = "grey";
                matriz[j][i] = 3;
                break;            
            }

                my_context.fillRect(i *40 + i, j * 40 + j , 40, 40);
                return;
            }
        }
    }


});


    var g = {};
    
        for (var i = 0; i < matriz.length * matriz.length; i++) {
    
            g[i] = {}
            
        }
     var item = function () {
         var nome;
         var peso;
     }
    
    
     var graph;


     $('#btnDij').on('click',function (){
        $('#btnA').click();

        var t1 = performance.now();
        g = {};
        for (var i = 0; i < matriz.length * matriz.length; i++) {
            g[i] = {}
                    
        }
        for (var i = 0; i < matriz.length; i++) {
            for (var j = 0; j < matriz[i].length; j++) {
                funa(i,j);
            }
        }

        graph = new Graph(g);
        
        var path = graph.findShortestPath(inicio, fim);
        if(path != null){

            var i = 1;
            var intervalId = setInterval(function (){
                desenharPathDij(path[i])
             i++;
             if(i == path.length - 1){
                 clearInterval(intervalId);
             }
            }, 200);
         
        } else {
            alert.console("Impossivel calcular");
            console.log('impossivel calcular')
        }

        var t2 = performance.now();

         var tempoRestanteTeste = $("#tempoDigitacao").text();
         tempoRestante = t2 - t1;
         $("#tempoDigitacao").text(tempoRestanteTeste);

     });

     $('#btnA').on('click',function (){

        var tempoInicioEstrela = performance.now();
        var matrizLig = new Array(tam);

        for (var i = 0; i < matriz.length; i++) {
            matrizLig[i] = new Array(tam);
            for (var j = 0; j < matriz[i].length; j++) {

                if(matriz[i][j] == 3){
                    matrizLig[i][j] = 0;
                } else {
                    matrizLig[i][j] = 1;
                }   
            }
        }

        graph = new GraphA(matrizLig)
        var start = graph.grid[parseInt(inicio / matriz.length, 10)][inicio % matriz.length];
    
        var end = graph.grid[parseInt(fim / matriz.length, 10)][fim % matriz.length];
        
        
        
        var path = astar.search(graph, start, end);
        console.log(path);
        if(path != null){

             var i = 0;
               var intervalId = setInterval(function (){
                desenharPathA(path[i])
                i++;
                if(i == path.length - 1){
                    clearInterval(intervalId);
                }
               }, 200);

        } else {
            console.log('impossivel calcular')
        }

         var tempoFinalEstrela = performance.now();


         var tempoRestante = $("#tempoDigitacao").text();
         tempoRestante = tempoFinalEstrela - tempoInicioEstrela;
         $("#tempoDigitacao").text(tempoRestante);
     });

var funa = function (a, b) {

    var pode = false;
    for (var i = a-1; i <=  a + 1; i++) {
        for (var j = b-1; j <= b + 1; j++) {
            if(pode){   
            if((i >= 0 && i < matriz.length) && (j >= 0 && j < matriz.length) && !(i== a && j == b)){
                   
                    if(matriz[i][j] != 3){
                        g[(a * matriz.length) + b][(i * matriz.length) + j] = 1;
                    }
                }
            }
            pode = !pode;
            
        }        
    }
}

var desenharPathDij = function (n) {
    var j = parseInt(n / matriz.length, 10);
    var i = n % matriz.length;
    my_context.fillStyle = "#f19500";
    
    my_context.fillRect(i *40 + i, j * 40 + j , 40, 40);
};

var desenharPathA = function (n) {
    
    my_context.fillStyle = "#ac6a00";
    
    my_context.fillRect(n.y *40 + n.y, n.x* 40 + n.x , 40, 40);
};


