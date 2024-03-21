document.addEventListener("DOMContentLoaded", function() {
    // Elementos del DOM
    var SEGUNDOS = 1000;
    const colorInput = document.getElementById("color");
    const grosorInput = document.getElementById("grosor");
    const anchoInput = document.getElementById("ancho");
    const valorGrosorInput = document.getElementById("valorGrosor");
    const valorAnchoInput = document.getElementById("valorAncho");
    const myButton = document.getElementById("myButton");
    const mySVG = document.getElementById("mySVG");
    const parteDos = document.getElementById("parteDos");
    const copiasInput = document.getElementById("copias");
    const contenedorBombillas = document.getElementById("contenedorBombillas");
    const parteTres = document.getElementById("parteTres");
    const segundosInput = document.getElementById("segundos");

    // Event listeners
    myButton.addEventListener("click", cambiarColor);
    grosorInput.addEventListener("input", actualizarGrosor);
    anchoInput.addEventListener("input", actualizarAncho);
    copiasInput.addEventListener("blur", crearCopias);
    segundosInput.addEventListener("blur", intermitente);

    // Funciones
    function cambiarColor() {
        const bombillaColor = colorInput.value;
        const grosor = grosorInput.value;
        const ancho = anchoInput.value;

        // Cambiar el color de la bombilla principal
        const path = mySVG.querySelector("#myPath");
        path.style.fill = bombillaColor;
        path.style.strokeWidth = grosor + 'px';

        // Cambiar estilos del botón
        myButton.style.backgroundColor = bombillaColor;

        // Cambiar ancho del SVG
        mySVG.style.width = ancho + 'px';

        // Mostrar la parte dos del formulario
        parteDos.style.display = 'block';
    }

    function actualizarGrosor() {
        valorGrosorInput.value = grosorInput.value;
    }

    function actualizarAncho() {
        valorAnchoInput.value = anchoInput.value;
    }

    function crearCopias() {
        const numeroCopias = copiasInput.value;
        const bombillaColor = colorInput.value;
        const grosor = grosorInput.value;
        const ancho = anchoInput.value;

        let copiasHTML = '';
        for (let i = 0; i < numeroCopias; i++) {
            copiasHTML += `<svg id="mySVG${i + 1}" width="${ancho}px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="copias">
                    <!-- Contenido del SVG -->
                    <defs><style>.a{fill:${bombillaColor};stroke:#000000;stroke-width:${grosor};stroke-linecap:round;stroke-linejoin:round;}</style></defs><path id="myPath" class="a copias" d="M37.2133,17.7292A13.2133,13.2133,0,1,0,16.5058,28.5958a4.0061,4.0061,0,0,1,1.6648,3.315v4.7315H29.8294V31.907A4.0511,4.0511,0,0,1,31.532,28.57,13.1741,13.1741,0,0,0,37.2133,17.7292Z"/>
        <line class="a" x1="19.4437" y1="38.9282" x2="28.5563" y2="38.9282"/>
        <line class="a" x1="19.3782" y1="41.2141" x2="28.4908" y2="41.2141"/>
        <line class="a" x1="21.5213" y1="43.5" x2="26.4787" y2="43.5"/>
        <polyline class="a" points="26.011 36.642 26.011 29.583 27.66 26.085"/>
        <polyline class="a" points="21.989 36.642 21.989 29.583 20.34 26.085"/>
                </svg>`;
        }

        contenedorBombillas.innerHTML = copiasHTML;
        parteTres.style.display = 'block';
    }

    function intermitente() {
        // hay que hacer clear intervalo ??
        SEGUNDOS = segundosInput.value * 1000 ;
        const intervalId = setInterval(cambiarEstado, SEGUNDOS);
    }

    let estado = 'on';
    function cambiarEstado() {
        const path = mySVG.querySelector("#myPath");
        const copiasBom = document.querySelectorAll(".copias");
        //console.log(copiasBom);
        
        if (estado === 'on') {
            path.style.fill = colorInput.value;
            copiasBom.forEach(item => {
                console.log(item);
                console.log(item.style.fill + ' ' + colorInput.value);
                item.style.fill = colorInput.value;
            });
            estado = 'off';
        } else {
            estado = 'on';
            path.style.fill = 'transparent';
            copiasBom.forEach(item => {
                item.style.fill = 'transparent';
            });
        }
    }
});
