let tiempoRef = Date.now();
let cronometrar = false;
let acumulado = 0;
let cambioColor;
let cambiandoColor = false;

setInterval(() => {
	let tiempo = document.getElementById('tiempo');
	if(cronometrar) {
		acumulado += Date.now() - tiempoRef;
	}
	tiempoRef = Date.now();	
	tiempo.innerHTML = formatearMS(acumulado)
}, 1000/60);


function formatearMS(tiempo_ms){

	  let MS = tiempo_ms % 1000
	  let St = Math.floor(((tiempo_ms - MS) / 1000))          
	  let S = St%60
	  let M = Math.floor((St / 60) % 60)
	  let H = Math.floor((St/60 / 60))
	  Number.prototype.ceros = function (n) {
	      return (this + "").padStart(n, 0)
          }

          return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2)
      }

function iniciar(){

	if(cronometrar == false){
		cambioColor = setInterval(CambiarFondo, 1000);
	}
	cronometrar = true;	
}
function pausar(){
	cronometrar = false;
	clearInterval(cambioColor);
	reiniciarColor();
}
function reiniciar(){
	acumulado = 0;
}
function CambiarFondo(){			
		const body = document.body;
		let color = Math.floor(Math.random()*999);
		body.style.backgroundColor = `#${color}`;
}

function reiniciarColor(){
	document.body.style.backgroundColor = "#111";
}