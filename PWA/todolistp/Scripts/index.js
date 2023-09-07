////////////BOTONES DE CABECERA
const MenuBtn = document.getElementById("MenuBtn");


//////////MENÚ DE OPCIONES
const MenuOpciones = document.getElementById("MenuOpciones");
const CambiarFondoBtn = document.getElementById("CambiarFondoBtn");
const CambiarTexturaMenuBtn = document.getElementById("CambiarTexturaMenuBtn");
const CambiarTextoCabeceraBtn = document.getElementById("CambiarTextoCabeceraBtn");
const CambiarTextoNotasBtn = document.getElementById("CambiarTextoNotasBtn");


//////////CUERPO DE LA LISTA DE TAREAS
const ul          = document.querySelector(".Ul");
const input       = document.querySelector("#inputItem");
const botonAg     = document.querySelector("#btnAg");
const empty       = document.querySelector(".empty");

//////// BODY
const Cuerpo = document.querySelector("BODY");
const header = document.getElementById("header");
const cajaLista = document.getElementById("cajaLista");
const CheckBG = document.getElementById("CheckBG");
const TextCheck = document.getElementById("TextCheck");
const CheckContainer = document.querySelector(".CheckContainer");

////////////MODAL
const ModalDialog = document.getElementById("ModalDialog");

///////LOCALSTORAGE
const toDoListKey = "LlaveToDoList-";
let toDoList;

/////NOTIFICACIONES
let textoNotificacion = "Tienes tareas pendientes en tu lista.";
let tienesTareas = false;


toDoList = updateToDo();

function EnterEnviar(e){    
    if(e.key == "Enter"){
         agregarLi();
    }
}

function updateToDo(){
     
    toDoList = { "tareas":[] };

    if(localStorage.key(0) != null || localStorage.key(1) != null ){    
    
        toDoList = JSON.parse(localStorage.getItem(toDoListKey));
    }

    if(toDoList.tareas.length >= 1) {
        tienesTareas =  true;
    }
    else{
        tienesTareas = false;
    }

    return toDoList;
}

function agregarLi(){    
       
    const tarea = input.value;        
    
    if(tarea === "" || tarea === " "){ 

        alert("Escribe la tarea para agregar a la lista."); 

        return;
        }
        
        for(let i = 0; i < toDoList.tareas.length; i++){               

        if(toDoList.tareas[i].tarea == tarea){

            alert(`Ya se ha agregado la tarea ${tarea}, agrega una distinta.`);
            console.log("Ya se ha agregado la tarea: " + tarea);
            return;
        }
    }

    let fecha = getDate(tarea);   

    sendDataToLocalStorage(fecha,tarea); 
    refillToDo(fecha,tarea);                     
        
}

function refillToDo(fecha,tarea){
    
    const li = document.createElement("LI");
    const div_2 = document.createElement("DIV");
          div_2.setAttribute("class", "BasuraIco");
          
    const p = 
    `<div class ="TareaFechaLi">   
    <span>${tarea}</span>
    <span class="fechaAnotado">Anotado el: ${fecha}</span>    
    </div>    
    `;

        li.innerHTML= p;
        div_2.appendChild(crearBotonEliminar(fecha, tarea));              
        li.appendChild(div_2);
        ul.appendChild(li);

            input.value = "";
            empty.style.visibility = "hidden";

}

function crearBotonEliminar(fecha, tarea){    
    //console.log(fecha);
    
    const btnEl = document.createElement("I");

    btnEl.setAttribute("class", "fa-solid fa-trash");

        btnEl.addEventListener("click", (e)=>{
            
            if (window.confirm(`¿Desea eliminar la tarea ${tarea}?`))                 
                EliminarElementoLocalStorage(e,fecha);
        });

        return btnEl;
}

function EliminarElementoLocalStorage(e,fecha){

    let objetoRecuperado = JSON.parse(localStorage.getItem(toDoListKey));                

        for(let i = 0; i < objetoRecuperado.tareas.length; i++){ 

            if(objetoRecuperado.tareas[i].fecha == fecha){

                toDoList.tareas.splice(i,1);
                
                localStorage.setItem(toDoListKey,JSON.stringify(toDoList));
            }                  
        }              
        
        const item = e.target.parentElement.parentElement;
        const items = document.querySelectorAll("#cajaLista LI");
        
        ul.removeChild(item);
        
        if(items.length === 1){                        
            empty.style.visibility = "visible"; 
        }
}

function getDate(){

    const Fecha    = new Date();
    const mes      = Fecha.getMonth();
    const dia      = Fecha.getDate();
    const hora     = Fecha.getHours();
    const minuto   = Fecha.getMinutes();
    const segundos = Fecha.getSeconds();
    
    const fecha  = `${dia}/${mes+1} ${hora}:${minuto}:${segundos} hrs`;

    return fecha;
}

function ObtenerValoresLocalStorage(){
   
    if(localStorage.key(0) != null){

        let toDoListR = JSON.parse(localStorage.getItem(toDoListKey));        
        let fecha;
        let tarea;

        for(let i = 0; i < toDoListR.tareas.length; i++){

            fecha = toDoListR.tareas[i].fecha;
            tarea = toDoListR.tareas[i].tarea;

            refillToDo(fecha,tarea);
        }
    } else{
        console.log(`localStorage.key(0) es = a: ${localStorage.key(0)}`);
        console.log(`y toDoList es = a:`); 
        console.log(toDoList);      
    }
}

function sendDataToLocalStorage(fecha,tarea){

    const valores = {fecha:fecha, tarea:tarea};

    //console.log(`P fecha: ${fecha}. P tarea: ${tarea}.`);

    toDoList.tareas.push(valores);

    localStorage.setItem(toDoListKey, JSON.stringify(toDoList));
}

function notificacion(){
    if ("Notification" in window) {
        // Solicitar permiso al usuario para mostrar notificaciones
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            // Crear y mostrar la notificación
                           
                if(obtenerHora() > 8 && obtenerHora() < 10 && tienesTareas == true){
                    var notification = new Notification("TAREAS PENDIENTES", {
                        body: textoNotificacion,
                        icon: "https://cdn.icon-icons.com/icons2/606/PNG/512/black-shopping-cart_icon-icons.com_56198.png" // Opcional: ruta a una imagen para el icono de la notificación
                      });
                }            
          }
        });
      }
}

function obtenerHora(){
    const Hora = new Date();
    return Hora.getHours();    
}

function MostrarOcultarMenuOpciones(){

    let Mostrar = "mostrarMenuOpciones .5s ease-in forwards";
    let Ocultar = "ocultarMenuOpciones .3s ease-in forwards";
    let Running = "0.5s ease-in 0s 1 normal forwards running mostrarMenuOpciones"
 
    if(MenuOpciones.style.animation == Running){
        MenuOpciones.style.animation = Ocultar;
        setTimeout(() => {
            MenuOpciones.style.display = "none";
        }, 300);
    }
    else{
        MenuOpciones.style.display = "flex";
        MenuOpciones.style.animation = Mostrar;

        console.log(MenuOpciones.style.animation);
    }
}

function MuyPronto(){
    alert("Muy pronto...✌");
}
CambiarTexturaMenuBtn.onclick = () => MuyPronto();
CambiarTextoCabeceraBtn.onclick = () => MuyPronto();
CambiarTextoNotasBtn.onclick = () => MuyPronto();


botonAg.onclick = () => agregarLi();

input.onkeydown = (e) => EnterEnviar(e);

MenuBtn.onclick = () => MostrarOcultarMenuOpciones();

setInterval(notificacion(),1200000);  

ObtenerValoresLocalStorage(); 
notificacion();