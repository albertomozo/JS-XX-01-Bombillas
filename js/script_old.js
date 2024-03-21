// Constantes
const SEGUNDOS = 1000;

// Elementos del DOM
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
        copiasHTML += `<svg id="mySVG${i + 1}" width="${ancho}px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <!-- Contenido del SVG -->
            </svg>`;
    }

    contenedorBombillas.innerHTML = copiasHTML;
    parteTres.style.display = 'block';
}

function intermitente() {
    const intervalId = setInterval(cambiarEstado, SEGUNDOS);
}

let estado = 'on';
function cambiarEstado() {
    const path = mySVG.querySelector("#myPath");
    const copiasBom = document.querySelectorAll(".copias");
    
    if (estado === 'on') {
        path.style.fill = colorInput.value;
        copiasBom.forEach(item => {
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
