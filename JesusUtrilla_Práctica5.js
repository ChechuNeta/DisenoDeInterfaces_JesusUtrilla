function mostrarInstrucciones() 
{
    document.querySelectorAll('.contenedor button, .contenedor select').forEach(element => {
        element.style.display = 'none';});

    document.getElementById('instrucciones').style.display = 'block';
    document.getElementById('instruccionesVolver').style.display = 'block';


}

function ocultarInstrucciones() 
{
    puntuacion = 0;
    clicks = 0;
    document.querySelector('.contenedor').style.display = 'grid';
    document.querySelector('.contenedor h1').style.display = 'block';
    document.querySelectorAll('.contenedor button, .contenedor select').forEach(element => {
        element.style.display = 'block';});

 

    document.getElementById('pantallafinal').style.display = 'none';
    document.getElementById('instrucciones').style.display = 'none';
    document.getElementById('instruccionesVolver').style.display = 'none';
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosa"));
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosb"));
    document.getElementById('pantallafinal').removeChild(document.getElementById("puntosc"));
}

//////////////////////////////////////////////////////////////////////////////////////////

var intervalodesaparecer;
var target = document.getElementById("target");
var fondo = document.getElementById("fondo");
var juegoIniciado = false;
var puntuacion = 0;
var clicks = 0;
var listapuntuaciones =[];



function Empezarjuego(eltiempo)
{
    document.querySelector('.contenedor').style.display = 'none';
    if(eltiempo == 1)
    {
        tiempo = 5000;
    }
    else
    {
        if(eltiempo == 2)
        {
            tiempo = 10000
        }
        else
        {
            tiempo= 15000;
        }
    }
    
    target.style.display = 'block';
    reposicionar();
    
    
    if (!juegoIniciado) {
        juegoIniciado = true;
        setTimeout(function () {
            var porcentajeacierto = (puntuacion / clicks) * 100;
            document.getElementById('pantallafinal').style.display = 'grid';

    
            puntos1 = document.createElement("p");
            puntos1.textContent= "Clicks Totales: " + clicks;
            puntos2 = document.createElement("p");
            puntos2.textContent= "Aciertos: "+puntuacion;
            puntos3 = document.createElement("p");
            puntos3.textContent= "Precisión: "+porcentajeacierto.toFixed(2)+"%";

            decirGanador(puntuacion, tiempo);
          
            puntos1.id="puntosa";
            puntos2.id="puntosb";
            puntos3.id="puntosc";

            // let puntuacionFinal = [puntuacion, porcentajeacierto];

            decirGanador(puntuacion, tiempo).then(data => alert(data)).catch(data=>alert(data));
           
    
            botonvolver = document.getElementById("pantallafinalvolver");
            document.getElementById("pantallafinal").insertBefore(puntos1, botonvolver);
            document.getElementById("pantallafinal").insertBefore(puntos2, botonvolver);
            document.getElementById("pantallafinal").insertBefore(puntos3, botonvolver);

            for(let i=0; listapuntuaciones.length;i++)
            {
                console.log(listapuntuaciones[i]);
            }

            target.style.display = 'none';
            juegoIniciado = false;
             
            clearTimeout(intervalodesaparecer);
        }, tiempo); 
    }
    
}



function decirGanador(numero, tiempo) 
{
    if(tiempo == 5000)
    {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
            if (numero > 7) {
            resolve("aciertos o mas ¡que locura!");
            } else {
            reject("Hay que espabilar!");
            }
            }, 1000);
            });
        
    }
    else
    {
        if(tiempo == 10000)
        {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                if (numero > 14) {
                resolve("Mas de 14 aciertos, ¡que locura!");
                } else {
                reject("Hay que espabilar!");
                }
                }, 1000);
                });
        }
        else
        {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                if (numero > 21) {
                resolve("Mas de 21 aciertos, ¡que locura!");
                } else {
                reject("Hay que espabilar!");
                }
                }, 1000);
                });
        }
    }
   }


function reposicionar() 
{
    let posicionx = Math.round(Math.random() * 95);
    let posiciony = Math.round(Math.random() * 95);
    let tamaño = randomIntFromInterval(40, 80);

    // Mostrar el target y establecer su posición y tamaño
    target.style.display = 'block';
    target.style.left = posicionx + "%";
    target.style.top = posiciony + "%";
    target.style.width = tamaño + "px";
    target.style.height = tamaño + "px";

    // Limpiar el temporizador anterior (si existe)
    clearTimeout(intervalodesaparecer);

    // Configurar el nuevo temporizador para reposicionar el target después de 2 segundos si no es pulsado
    intervalodesaparecer = setTimeout(function () {
        reposicionar();
    }, 1400);
   
}


function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

target.onmousedown = function() 
{
    aciertoclick();
}

fondo.onmousedown = function() 
{
    falloclick();
}

function aciertoclick()
{
    if (juegoIniciado)
    {
        puntuacion +=1;
        // clicks +=1;
        reposicionar();  
    }        
}

function falloclick()
{
    if (juegoIniciado)
    {
        clicks +=1;     
    }        
}


