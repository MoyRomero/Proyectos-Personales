
const boton = document.getElementById("boton");
const botonNoPresionado = document.getElementById("imgBoton");
const botonPresionado = document.getElementById("imgBotonPresionado");

const nada = new Audio("/Content/media/audio/nada.mp3");
const ninguno = new Audio("/Content/media/audio/ninguno.mp3");
const no = new Audio("/Content/media/audio/no.mp3");
const noo = new Audio("/Content/media/audio/noo.mp3");
const pruebaPreguntando = new Audio("/Content/media/audio/pruebaPreguntando.mp3");
const si = new Audio("/Content/media/audio/si.mp3");

const PrevenirDefault = () =>{
    document.getElementById("imgCaracola").addEventListener("contextmenu", (e) => e.preventDefault());
    document.getElementById("imgBoton").addEventListener("contextmenu", (e) => e.preventDefault());
    botonPresionado.addEventListener("contextmenu", (e) => e.preventDefault());
}

PrevenirDefault();


//boton.addEventListener("mousedown", () => Presionando());
//boton.addEventListener("mouseup", () => SoltandoBoton());

boton.addEventListener("touchstart", () => Presionando());
boton.addEventListener("touchend", () => SoltandoBoton());


const Presionando = () =>{    

    botonNoPresionado.style.visibility = "hidden";
    botonPresionado.style.visibility = "visible";

}

const SoltandoBoton = () =>{
    
    botonNoPresionado.style.visibility = "visible";
    botonPresionado.style.visibility = "hidden";

    numeroRandom = Math.floor(Math.random() * 100) + 1;
    console.log("Numero random: " + numeroRandom);

    if(numeroRandom >= 0  && numeroRandom <= 15){
        noo.play();
        return;
    }
    if(numeroRandom >= 16  && numeroRandom <= 35){
        no.play();
        return;
    }
    if(numeroRandom >= 36 && numeroRandom <= 62){
        si.play();
        return;
    }
    if(numeroRandom >= 63 && numeroRandom <= 75){
        nada.play();
        return;
    }
    if(numeroRandom >= 76 && numeroRandom <= 89){
        ninguno.play();
        return;
    }
    if(numeroRandom >= 90 && numeroRandom <= 101){
        pruebaPreguntando.play();
        return;
    }     

}
