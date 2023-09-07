////////LOCAL STORAGE
const toDoListKeyIMGS = "LlaveImgBackground";
let BackGrounds = { "imagen":[], "extension":[] };
let opacidadEs1 = true;


const ValidacionSubirImagen = (InputImg) =>{

    if(InputImg.files[0] == "" || InputImg.files[0] == undefined){        
        alert("No se han cargado archivos de tipo imágenes válidas.");
        return;
    }     
    else if(InputImg.files[0].size > 3 * 1024 * 1024){
        alert("La imagen cargada excede el peso límite de 3MB permitidos.");
        return;
    }   
    else{            
        AlmacenarImagenLS();
    }
};

const BorrarImagenLocalStorage = () =>{
    
    if(localStorage.key(1) != null){
        if(confirm("¿Desea eliminar la imagen de fondo actual?") == 1)            
            localStorage.removeItem(toDoListKeyIMGS); 
            window.location.reload();       
    }
    else{
        alert("Aún no se ha cargado una imagen de fondo que se pueda borrar.");
        return;
    }
};

const OcultarFondo = (e) =>{

    if(e.target.checked) console.log("Checkeado");
    else console.log("UnCheckeado");

    if(opacidadEs1 == true){
        TextCheck.textContent = "Mostrar";
        header.style.animation = "activarOpacidad .5s ease-in forwards";
        cajaLista.style.animation = "activarOpacidad .5s ease-in forwards";
        MenuOpciones.style.animation = "activarOpacidad .5s ease-in forwards";
        CheckContainer.style.opacity = ".2";
        opacidadEs1 = false;
        return;
    }
    
    else if(opacidadEs1 == false){
        TextCheck.textContent = "Ocultar";
        header.style.animation = "desactivarOpacidad .5s ease-in forwards";
        cajaLista.style.animation = "desactivarOpacidad .5s ease-in forwards";
        MenuOpciones.style.animation = "activarOpacidad .5s ease-in forwards";
        CheckContainer.style.opacity = "1";
        opacidadEs1 = true;
        return;
    }
};

const AlmacenarImagenLS = () => {

    const imgCargada = InputImg.files[0];
    const lector = new FileReader();   

    lector.onloadend = () =>{

        let resultado = DataImagenExtension(lector.result, imgCargada);

        if(resultado == "Formato no válido"){
            alert("Formato de archivo no válido. Formatos de archivo válidos: png, jpeg, jpg, gif.");
            return;
        }
        console.log(`Extension: ${resultado[0]}  Imágen: ${resultado[1]}`);
        
        if(resultado[0] != undefined && resultado[1] != undefined){

            BackGrounds.extension.push(resultado[0]);
            BackGrounds.imagen.push(resultado[1]);

            if(localStorage.key(1) != null){
                //console.log(localStorage.key(1));
                localStorage.removeItem(toDoListKeyIMGS);
            }

            localStorage.setItem(toDoListKeyIMGS, JSON.stringify(BackGrounds));

            if(confirm("Desea sustituir el fondo con la imágen cargada?")==1)
                CambiarDeFondo(resultado[0],resultado[1]);
            
            alert("Se han guardado los cambios de manera correcta.");

            LimpiarCampos();
        }
    }
    lector.readAsDataURL(imgCargada);
};

const CambiarBGSiExiste = () =>{
    if(localStorage.key(1) != null){
        let obtenerImagen = JSON.parse(localStorage.getItem(toDoListKeyIMGS));
        let extension = obtenerImagen.extension;
        let imagen = obtenerImagen.imagen;

        CambiarDeFondo(extension,imagen);
    }
};

const LimpiarCampos = () =>{
    InputImg.files[0] = null;
    ModalDialog.close();    
    BackGrounds = { "imagen":[], "extension":[] }
};

const CambiarDeFondo = (extension,imagen) =>{
    let url = `"data:image/${extension};base64,${imagen}"`
    Cuerpo.style.backgroundImage = `url(${url})`;
    Cuerpo.style.backgroundSize = "cover";
    Cuerpo.style.backgroundPosition = "center";
};

const DataImagenExtension = (result, imgCargada) =>{
    let indexComa = result.indexOf(",")+1;
    let dataImagen = result.substring(indexComa);

    let indexPunto = imgCargada.name.indexOf(".")+1;
    let extension = imgCargada.name.substring(indexPunto);

    if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "gif" ){
        return [extension,dataImagen];        
    }
    else{
        return ["Formato no válido"];
    }    
};

const CargarImagen = (ImgVistaPrevia_1) =>{
    const imgCargada = InputImg.files[0];
    const lector = new FileReader();   
    lector.onloadend = () => ImgVistaPrevia_1.src = lector.result;
    lector.readAsDataURL(imgCargada);
};

const ConstruirModalBackgroundImage = () =>{
    const ModalCuerpo = `
        <div class="ModalCambioBG">
            <div>
                <h3>CAMBINADO IMAGEN DE FONDO</h3>
            </div>            
            <div>
                <p>Carga tu imagen para cambiar el fondo y obtener una vista previa.</p>
            </div>
            <div>
                <img id="ImgVistaPrevia_1" src="https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg">
            </div>
            <div>
                <input id="InputImg" type="file">
            </div>
            <div>
                <button id="UploadImgBtn">CARGAR</button>
            </div>
            <div>
                <button id="UploadCancel">CANCELAR</button>
            </div> 
            <div>
                <button id="BorrarBGBtn">BORRAR FONDO</button>
            </div>           
        </div>`;

    ModalDialog.innerHTML = ModalCuerpo;

    const InputImg = document.getElementById("InputImg");
    const UploadImgBtn = document.getElementById("UploadImgBtn");
    const UploadCancel = document.getElementById("UploadCancel");
    const BorrarBGBtn = document.getElementById("BorrarBGBtn");
    const ImgVistaPrevia_1 = document.getElementById("ImgVistaPrevia_1");

    BorrarBGBtn.onclick  = () => BorrarImagenLocalStorage();
    InputImg.onchange    = () => CargarImagen(ImgVistaPrevia_1);
    UploadImgBtn.onclick = () => ValidacionSubirImagen(InputImg);
    UploadCancel.onclick = () => CerrarModal();
};

const CerrarModal = () =>{
    ModalDialog.close();    
    ModalDialog.innerHTML = "";
};

const CrearMostrarModal = () =>{
    ConstruirModalBackgroundImage();
    ModalDialog.showModal();
};

CambiarBGSiExiste();

CheckBG.onchange = (e) => OcultarFondo(e);

CambiarFondoBtn.onclick = () => CrearMostrarModal();