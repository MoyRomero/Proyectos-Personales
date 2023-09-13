const PlayButton = document.querySelector(".PlayButton_buttonWrapper__wWFKn");
const BarraProgresiva = document.querySelector(".ProgressBar_progressBarSlider__AXXKa");
const RolitasContainer = document.getElementById("RolitasContainer");

const CadenaSRC = (parametroRuta) =>{
    return `https://open.spotify.com/embed/track/${parametroRuta}?utm_source=generator`
}

const construirIFrame = (src,id) =>{  
        return `            
                <iframe id="frame_${id}" class="iframePersonalizado" src="${src}" 
                aria-controls="" frameBorder="0" allowfullscreen="" allow="autoplay; 
                clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
            `;
}

const Canciones = [
    {banda:"James", canciones:[
        {cancion:"Getting Away With It", src:CadenaSRC("1oZYaztSjkVQ7PeKwUbdab")},
        {cancion:"Space", src:CadenaSRC("4BButaL8zit1XpoCcd9mmW")},
        {cancion:"Just Like Fred Astaire", src:CadenaSRC("7f9mxxS8jOGmT5qYX8HjPz")},
        {cancion:"Seven", src:CadenaSRC("0sg39WIm5X4KSYczNq3mQ6")},
        {cancion:"Runaground", src:CadenaSRC("0RoFKojH4DhkXlLFWFSUnW")},
        {cancion:"Lose Control", src:CadenaSRC("2gD4GDzPw9QWQXJVYkc0la")}   ]},

    //  {banda:"Dark Stares", canciones:[
    //     {cancion:"Pedal Pusher", src:CadenaSRC("3uOXTKKPpM1ED52vadIad5")},
    //     {cancion:"Ordinary Way", src:CadenaSRC("1jMuEeJgVSjeorH9IviMuG")}    ]},

    //   {banda:"Arctic Monkeys", canciones:[
    //     {cancion:"Love Is A Laserquest", src:CadenaSRC("0S6CXA5LpRDX6b4akgrOot")},
    //     {cancion:"Piledriver Waltz", src:CadenaSRC("4Ai0ANRDYwx6mCD4Uty1WS")},
    //     {cancion:"Leave Before The Lights Come On", src:CadenaSRC("4Du0BRUJvKybzxcRplp7HF")},
    //     {cancion:"Bigger Boys And Stolen Sweet Hearts", src:CadenaSRC("4TC0dnB5DxvoKcsalffFZe")} ]},

    //    {banda:"Low Roar", canciones:[
    //     {cancion:"Panthoms", src:CadenaSRC("3Z71twl5Fz2W1bT4mwnor7")},
    //     {cancion:"Im Leaving", src:CadenaSRC("2CLzs4DW6EAtCv6FC6Mbix")},
    //     {cancion:"Tonight Tonight", src:CadenaSRC("0WAkoLKlEFRp4V3llA27KF")}  ]}
];

const ConstruirRolitas = () =>{

    let iframe = '';
    let id = 1;

    for(let i = 0; i < Canciones.length; i++){
        
        iframe += `
        <div class="contenidoBanda">
            <div class="tituloBanda">
                <h3>${Canciones[i].banda}</h3>
            </div>
            <div class="cancionesBanda">`;
        
        for(let j = 0; j < Canciones[i].canciones.length; j++){

            iframe += construirIFrame(Canciones[i].canciones[j].src,id);

            id++;
        };
        iframe += `
            </div>
        </div>`;
        
    }    

    RolitasContainer.innerHTML = iframe;
}

const colorDeFondoPorCancion = () =>{

    let cantidad = 0;

    //document.querySelectorAll(".iframePersonalizado").forEach(boton => cantidad++);
    document.querySelectorAll('[aria-label="Play"]').forEach(boton => cantidad++);

    console.log(document.querySelector(`[aria-label="Pause"]`));
    
   //document.body.style.backgroundColor = "";

}

window.onload = ConstruirRolitas();

const iframe = document.getElementById('frame_2');

//const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

