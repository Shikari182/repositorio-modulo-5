import "./style.css";

let puntuacion: number = 0;

function muestraPuntuacion(): void {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerText = `Puntuación: ${puntuacion}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
});

const dameNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

function dameCarta(numeroAleatorio: number): number {
  // Si el número es mayor que 7, se le suma 2 para obtener 10, 11 o 12 (cartas que valen 0.5)
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
}

function obtenerUrlCarta(carta: number): string {
  let urlCarta = "";
  switch (carta) {
    case 1:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  return urlCarta;
}

const mostrarUrlCarta = (urlCarta: string) => {
  const img = document.getElementById("cartaImagen");
  if (img instanceof HTMLImageElement) {
    img.src = urlCarta;
  }
};

const obtenerPuntosCarta = (carta: number): number => {
  // Las cartas del 1 al 7 valen su número; las figuras (10, 11, 12) valen 0.5
  if (carta >= 1 && carta <= 7) {
    return carta;
  }
  return 0.5;
};

function sumarPuntos(punto: number): number {
  return puntuacion + punto;
}

const actualizarPuntuacion = (nuevaPuntuacion: number): void => {
  puntuacion = nuevaPuntuacion;
};

/**
 * Gestiona el estado de la partida.
 * Si la puntuación es mayor a 7.5, muestra un mensaje de Game Over y deshabilita todos los botones.
 * Si la puntuación es exactamente 7.5, muestra el mensaje de victoria y deshabilita el juego.
 */
const gestionarPartida = (): void => {
  if (puntuacion > 7.5) {
    alert("Game Over! Te has pasado de 7 y medio");
    deshabilitarJuego();
  } else if (puntuacion === 7.5) {
    alert("¡Lo has clavado! ¡Enhorabuena!");
    deshabilitarJuego();
  }
};

// ----------------- EVENTOS -----------------

// Botón "Pedir Carta"
const botonPedirCarta = document.getElementById("pedirCarta");
if (botonPedirCarta instanceof HTMLButtonElement) {
  botonPedirCarta.addEventListener("click", () => {
    const numeroAleatorio = dameNumeroAleatorio();
    const carta = dameCarta(numeroAleatorio);
    console.log(`Carta pedida: ${carta}`);

    // Mostrar la carta en la interfaz
    const urlCarta = obtenerUrlCarta(carta);
    mostrarUrlCarta(urlCarta);

    // Obtener y sumar los puntos de la carta
    const puntosCarta = obtenerPuntosCarta(carta);
    const puntosSumados = sumarPuntos(puntosCarta);
    actualizarPuntuacion(puntosSumados);
    muestraPuntuacion();
    gestionarPartida();
  });
}

// Botón "¿Cuál hubiese sido mi próxima carta?" (Carta Siguiente)
// Inicialmente deshabilitado.
const botonCartaSiguiente = document.getElementById("cartaSiguiente");
if (botonCartaSiguiente instanceof HTMLButtonElement) {
  botonCartaSiguiente.disabled = true;
  botonCartaSiguiente.addEventListener("click", () => {
    const cartaFinal = dameCartaFinal();
    const urlCartaFinal = obtenerUrlCarta(cartaFinal);
    mostrarUrlCarta(urlCartaFinal);
    const puntosCartaFinal = obtenerPuntosCarta(cartaFinal);
    // Se calcula la puntuación hipotética sin modificar la puntuación real
    const hipoteticaPuntuacion = puntuacion + puntosCartaFinal;
    // Una vez utilizada, se deshabilita para que solo se pueda usar una vez
    botonCartaSiguiente.disabled = true;

    if (hipoteticaPuntuacion > 7.5) {
      alert(
        `Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando ${hipoteticaPuntuacion} puntos. ¡Habrías perdido el juego!`
      );
    } else if (hipoteticaPuntuacion === 7.5) {
      alert(
        "Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!"
      );
    } else {
      alert(
        `Con la próxima carta, solo tendrías ${hipoteticaPuntuacion} puntos, lo que no alcanza para 7 y medio.`
      );
    }
  });
}

// Botón "Plantarse"
const botonPlantarse = document.getElementById("plantarse");
if (botonPlantarse instanceof HTMLButtonElement) {
  botonPlantarse.addEventListener("click", () => {
    if (puntuacion < 4) {
      alert("Has sido muy conservador.");
    } else if (puntuacion === 5) {
      alert("Te ha entrado el canguelo eh?");
    } else if (puntuacion === 6 || puntuacion === 7) {
      alert("Casi casi...");
    } else if (puntuacion === 7.5) {
      alert("¡Lo has clavado! ¡Enhorabuena!");
    } else {
      alert(`Te has plantado con ${puntuacion} puntos.`);
    }
    // Al plantarse se deshabilitan los botones de pedir carta y plantarse,
    // y se habilita el botón de "¿Cuál hubiese sido mi próxima carta?" para usarse una única vez.
    deshabilitarJuegoPlantarse();
  });
}

/**
 * Deshabilita los botones para seguir jugando y habilita el botón
 * de "¿Cuál hubiese sido mi próxima carta?" para que pueda usarse una única vez.
 */
function deshabilitarJuegoPlantarse(): void {
  const botonPedir = document.getElementById("pedirCarta");
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  const botonPlantarse = document.getElementById("plantarse");

  if (
    botonPedir instanceof HTMLButtonElement &&
    botonCartaSiguiente instanceof HTMLButtonElement &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    botonCartaSiguiente.disabled = false; // Se habilita para una única consulta.
  }
}

/**
 * Deshabilita todos los botones del juego.
 */
function deshabilitarJuego(): void {
  const botonPedir = document.getElementById("pedirCarta");
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  const botonPlantarse = document.getElementById("plantarse");

  if (
    botonPedir instanceof HTMLButtonElement &&
    botonCartaSiguiente instanceof HTMLButtonElement &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPedir.disabled = true;
    botonCartaSiguiente.disabled = true;
    botonPlantarse.disabled = true;
  }
}

function dameCartaFinal(): number {
  const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
}

// Botón "Nueva Partida"
const botonNuevaPartida = document.getElementById("nuevaPartida");
if (botonNuevaPartida instanceof HTMLButtonElement) {
  botonNuevaPartida.addEventListener("click", () => {
    // Reiniciamos la puntuación y el estado del juego
    puntuacion = 0;
    muestraPuntuacion();
    const botonPedir = document.getElementById("pedirCarta");
    const botonCartaSiguiente = document.getElementById("cartaSiguiente");
    const botonPlantarse = document.getElementById("plantarse");
    const img = document.getElementById("cartaImagen");

    if (
      botonPedir instanceof HTMLButtonElement &&
      botonCartaSiguiente instanceof HTMLButtonElement &&
      botonPlantarse instanceof HTMLButtonElement &&
      img instanceof HTMLImageElement
    ) {
      botonPedir.disabled = false;
      botonCartaSiguiente.disabled = true;
      botonPlantarse.disabled = false;
      img.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"; // Se vuelve a mostrar la carta boca abajo
    }
  });
}