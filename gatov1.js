// Contexto del canvas
var canvas = document.getElementById("tablero");
var ctx = canvas.getContext("2d");

// Cuadrícula y el tamaño de las celdas
var gridSize = 3;
var cellSize = canvas.width / gridSize;

// Estado 
var estados = [["", "", ""], ["", "", ""], ["", "", ""]];
var turnoJugador = "X"; // Inicia el jugador 1 (Gato)

// Dibujar en tablero
function pintarRejilla() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Horizontales
    for (var i = 1; i < gridSize; i++) {
        var y = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Verticales
    for (var j = 1; j < gridSize; j++) {
        var x = j * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Fichas en las celdas 
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            if (estados[row][col] !== "") {
                dibujarFicha(row, col, estados[row][col]);
            }
        }
    }
}

// Función seleccionar una celda
function seleccionarCelda(event) {
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;

    var row = Math.floor(mouseY / cellSize);
    var col = Math.floor(mouseX / cellSize);

    if (estados[row][col] === "") {
        colocarFicha(row, col);
    }
}

// Función  colocar una ficha en el tablero
function colocarFicha(row, col) {
    if (estados[row][col] === "") {
        estados[row][col] = turnoJugador;
        pintarRejilla(); // Repetición de ficha

        // Turno del jugador
        turnoJugador = turnoJugador === "X" ? "O" : "X";
    }
}

// Ficha en una celda
function dibujarFicha(row, col, jugador) {
    var centerX = col * cellSize + cellSize / 2;
    var centerY = row * cellSize + cellSize / 2;

    ctx.fillStyle = jugador === "X" ? "blue" : "red";//Fichas y sus colores(ya no habiliatadas por las iamagenes)
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(jugador, centerX, centerY);
}
var imgX = new Image();
imgX.src = 'Gato.png'; // Ruta de la imagen X
var imgO = new Image();
imgO.src = 'Raton.png'; // Ruta de la imagen O



// Función dibujar ficha
function dibujarFicha(row, col, jugador) {
    var centerX = col * cellSize + cellSize / 2;
    var centerY = row * cellSize + cellSize / 2;

    var img = (jugador === "X") ? imgX : imgO; // Seleccionar imagen según el jugador

    ctx.drawImage(img, centerX - cellSize / 4, centerY - cellSize / 4, cellSize / 2, cellSize / 2);
}




// Función para reiniciar el juego
function reiniciarJuego() {
    estados = [["", "", ""], ["", "", ""], ["", "", ""]];
    pintarRejilla();
}


// Función para dibujar línea en la celda ganadora
function dibujarLinea(x1, y1, x2, y2) {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1 * cellSize + cellSize / 2, y1 * cellSize + cellSize / 2);
    ctx.lineTo(x2 * cellSize + cellSize / 2, y2 * cellSize + cellSize / 2);
    ctx.stroke();
}

// Función para reiniciar el juego
function reiniciarJuego() {
    estados = [["", "", ""], ["", "", ""], ["", "", ""]];
    pintarRejilla();
}

//------------------------------------------------------------------------



//-----------------------------------------------------------------------


// Eventos de Mouse 
canvas.addEventListener("mousemove", function (event) {
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;

    var row = Math.floor(mouseY / cellSize);
    var col = Math.floor(mouseX / cellSize); //Floor para devolución de enteros.

    if (estados[row][col] === "") {
        resaltarCelda(row, col);
    } else {
        quitarResaltado();
    }
});

// Resalta Celda
function resaltarCelda(row, col) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

// Resaltado de celdas
function quitarResaltado() {
    pintarRejilla();
}


pintarRejilla();




