const ContenedorCV = document.getElementById("ContenedorCV");
const EspacioCV = document.getElementById("EspacioCV");
const btnMostrarCV = document.getElementById("btnMostrarCV");
const btnDescargarCV = document.getElementById("btnDescargarCV");

const MostrarOcultarCV = () =>{

    const imgHTML = document.createElement("IMG");   

    if(btnMostrarCV.textContent == "MOSTRAR CV"){

        AdaptarDivCV({
            btnTexto:"OCULTAR CV",
            imgWidth:"100%",
            imgHeight:"auto",
            src:"/Content/media/img/CV.jpg"
        },imgHTML);
    }
    else{
        AdaptarDivCV({
            btnTexto:"MOSTRAR CV"
        },imgHTML);
    }
}

const AdaptarDivCV = (cssObject,imgHtml) =>{    

    if(btnMostrarCV.textContent == "MOSTRAR CV"){

        ContenedorCV.style.animation = "MostrarCVDiv 1s forwards";

        btnMostrarCV.textContent = cssObject.btnTexto;  

        imgHtml.setAttribute("src",cssObject.src);
        imgHtml.style.opacity="0";
        imgHtml.style.width = cssObject.imgWidth;
        imgHtml.style.height = cssObject.imgHeight;

        EspacioCV.appendChild(imgHtml);
        document.querySelector("#EspacioCV IMG").style.animation ="MostrarCVimg 1s forwards";
    }
    else{
        btnMostrarCV.textContent = cssObject.btnTexto;
        
        ContenedorCV.style.animation ="OcultarCVDiv 1s forwards";
        document.querySelector("#EspacioCV IMG").style.animation ="OcultarCVimg 1s forwards";
        setTimeout(()=>{
            document.querySelector("#EspacioCV IMG").parentNode.removeChild(document.querySelector("#EspacioCV IMG"));
        },1000);        
    }   
}

btnMostrarCV.onclick = () => MostrarOcultarCV();
