    
var tam = 15;  
var batata = "algo";  
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
    
    //console.log(x)
    //console.log(y)
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
    
    //console.log(x)
    //console.log(y)
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



$(canvas).on('click', function(e) {
    
    //console.log(e.offsetX);
    //console.log(e.offsetY);
      
   // var x = Math.trunc(e.offsetX  / 40) * 40 + Math.trunc(e.offsetX / 40);
   // var y = Math.trunc(e.offsetY / 40) * 40 + Math.trunc(e.offsetY / 40);

  
    
    
})

    //var map = {0:{1:1, 3:1},1:{2:1}, 2:{3:1}};
    ///var graph = new Graph(map);
    var graph;

    var g = {};
    
        for (var i = 0; i < matriz.length * matriz.length; i++) {
    
            g[i] = {}
            
        }
     var item = function () {
         var nome;
         var peso;
     }
     var graph;
     $('#btnSet').on('click',function (){
        g = {};
        for (var i = 0; i < matriz.length * matriz.length; i++) {
            g[i] = {}
                    
        }
        for (var i = 0; i < matriz.length; i++) {
            for (var j = 0; j < matriz[i].length; j++) {
                funa(i,j);
            }
        } 

        graph = new Graph(g)
      
        
        var path = graph.findShortestPath(inicio, fim);
        
        for (var i = 0; i < path.length; i++) {
            desenharPath(path[i])
        }
        
     })
var funa = function (a, b) {
    var cont = 0;
    for (var i = a-1; i <=  a + 1; i++) {
        for (var j = b - 1; j <= b + 1; j++) {
            if((i >= 0 && i < matriz.length) && (j >= 0 && j < matriz.length) && !(i== a && j == b)){
                if(matriz[i][j] != 3){
                    g[(a * matriz.length) + b][(i * matriz.length) + j] = 1;
                }
                         
            }
        }        
    }
}

var desenharPath = function (n) {
    var j = parseInt(n / matriz.length, 10);
    var i = n % matriz.length;
    my_context.fillStyle = "yellow";
    
    my_context.fillRect(i *40 + i, j * 40 + j , 40, 40);
}