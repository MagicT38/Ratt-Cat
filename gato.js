// Obtener el elemento de lienzo y su contexto
const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

// Definir el tamaño del tablero y cada celda
const gridSize = 3;
const cellSize = canvas.width / gridSize;

// Matriz que representa el estado del juego
const estados = [["", "", ""], ["", "", ""], ["", "", ""]];

// Inicializar el turno del jugador
let turnoJugador = "X";

// Crear objetos de imagen para el gato y el ratón
const imgX = new Image();
imgX.src = 'Gato.png';
const imgO = new Image();
imgO.src = 'Raton.png';

// Asegurar que las imágenes estén cargadas antes de llamar a pintarRejilla
imgX.onload = imgO.onload = function() {
    pintarRejilla();
};

// Función para dibujar el tablero
function pintarRejilla() {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las líneas del tablero
    for (let i = 1; i < gridSize; i++) {
        const y = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    for (let j = 1; j < gridSize; j++) {
        const x = j * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Dibujar las fichas en el tablero
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (estados[row][col] !== "") {
                dibujarFicha(row, col, estados[row][col]);
            }
        }
    }
}

// Función que se ejecuta cuando se hace clic en una celda
function seleccionarCelda(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const row = Math.floor(mouseY / cellSize);
    const col = Math.floor(mouseX / cellSize);

    if (estados[row][col] === "") {
        colocarFicha(row, col);
        const ganador = yaGano();
        if (ganador) {
            // Dibujar la línea de victoria y mostrar la alerta después
            dibujarLinea(ganador);
            
            // Esperar 5 milisegundos antes de mostrar la alerta
            setTimeout(function () {
                alert("¡El " + (ganador === "X" ? "Gato" : "Raton") + " ha sido cazado!");
                reiniciarJuego();
            }, 5);
        } else if (empate()) {
            // Esperar 0 milisegundos antes de mostrar la alerta
            setTimeout(function () {
                alert("¡Es un empate!");
                reiniciarJuego();
            }, 0);
        }
    }
}

// Función para colocar una ficha en una celda
function colocarFicha(row, col) {
    if (estados[row][col] === "") {
        estados[row][col] = turnoJugador;
        pintarRejilla();
        turnoJugador = turnoJugador === "X" ? "O" : "X";
    }
}

// Función para dibujar una ficha en una celda
function dibujarFicha(row, col, jugador) {
    const centerX = col * cellSize + cellSize / 2;
    const centerY = row * cellSize + cellSize / 2;
    const img = (jugador === "X") ? imgX : imgO;
    ctx.drawImage(img, centerX - cellSize / 4, centerY - cellSize / 4, cellSize / 2, cellSize / 2);
}

// Función para verificar si hay un ganador
function yaGano() {
    for (let i = 0; i < gridSize; i++) {
        if (estados[i][0] !== "" && estados[i][0] === estados[i][1] && estados[i][1] === estados[i][2]) {
            return estados[i][0];
        }
        if (estados[0][i] !== "" && estados[0][i] === estados[1][i] && estados[1][i] === estados[2][i]) {
            return estados[0][i];
        }
    }
    if (estados[0][0] !== "" && estados[0][0] === estados[1][1] && estados[1][1] === estados[2][2]) {
        return estados[0][0];
    }
    if (estados[0][2] !== "" && estados[0][2] === estados[1][1] && estados[1][1] === estados[2][0]) {
        return estados[0][2];
    }
    return false;
}

// Función para verificar si es un empate
function empate() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (estados[i][j] === "") {
                return false; // Todavía hay al menos una celda vacía
            }
        }
    }
    return true; // No hay celdas vacías, es un empate
}

// Función para dibujar la línea de victoria
function dibujarLinea(ganador) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.drawImage(canvas, 0, 0);

    tempCtx.strokeStyle = "rgba(255, 255, 255, 0)";
    tempCtx.lineWidth = 5;
    tempCtx.beginPath();

    // No dibujar la imagen ganadora, solo la línea de victoria
    switch (ganador) {
        case "X":
            tempCtx.moveTo(0, 0);
            tempCtx.lineTo(cellSize * 3, cellSize * 3);
            break;
        case "O":
            tempCtx.moveTo(0, cellSize / 2);
            tempCtx.lineTo(cellSize * 3, cellSize / 2);
            break;
        case "": // Agregado para manejar el caso de empate
            return;
        // ... completar con otras condiciones según sea necesario
    }
    tempCtx.stroke();

    // Copiar el lienzo temporal al lienzo principal
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    // Limpiar el lienzo temporal
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    estados.forEach(row => row.fill(""));
    pintarRejilla();
}

// Evento que resalta la celda al pasar el ratón sobre ella
canvas.addEventListener("mousemove", function (event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const row = Math.floor(mouseY / cellSize);
    const col = Math.floor(mouseX / cellSize);

    if (estados[row][col] === "") {
        resaltarCelda(row, col);
    } else {
        quitarResaltado();
    }
});

// Función para resaltar la celda
function resaltarCelda(row, col) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

// Función para quitar el resaltado
function quitarResaltado() {
    pintarRejilla();
}

// Dibujar el tablero inicial
pintarRejilla();
