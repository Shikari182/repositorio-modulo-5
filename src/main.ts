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
 * Función para obtener la hipotética puntuación si se pidiera otra carta.
 */
function obtenerHipoteticaPuntuacion(puntosCarta: number): number {
  return puntuacion + puntosCarta;
}

/** 
 * Función para bloquear todos los botones del juego, excepto "nuevaPartida".
 */
const bloquearBotones = (): void => {
  const botones = document.querySelectorAll("button");
  botones.forEach((boton) => {
    if (boton instanceof HTMLButtonElement && boton.id !== "nuevaPartida") {
      boton.disabled = true;
    }
  });
};

/** 
 * Función para habilitar (rehabilitar) los botones de juego: se habilita "pedirCarta" y "plantarse"
 * y se deshabilita "cartaSiguiente" (por defecto).
 */
const habilitarJuego = (): void => {
  const botonPedirCarta = document.getElementById("pedirCarta");
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  const botonPlantarse = document.getElementById("plantarse");
  if (
    botonPedirCarta instanceof HTMLButtonElement &&
    botonCartaSiguiente instanceof HTMLButtonElement &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPedirCarta.disabled = false;
    botonCartaSiguiente.disabled = true;
    botonPlantarse.disabled = false;
  }
};

/**
 * Gestiona el estado de la partida: si se supera o se consigue 7.5,
 * muestra el mensaje correspondiente y bloquea el juego.
 */
const gestionarPartida = (): void => {
  if (puntuacion > 7.5) {
    alert("Game Over! Te has pasado de 7 y medio");
    bloquearBotones();
  } else if (puntuacion === 7.5) {
    alert("¡Lo has clavado! ¡Enhorabuena!");
    bloquearBotones();
  }
};

/**
 * Función para obtener el mensaje al plantarse según la puntuación.
 */
function obtenerMensajePlantarse(puntos: number): string {
  if (puntos < 4) {
    return "Has sido muy conservador.";
  } else if (puntos === 5) {
    return "Te ha entrado el canguelo eh?";
  } else if (puntos === 6 || puntos === 7) {
    return "Casi casi...";
  } else if (puntos === 7.5) {
    return "¡Lo has clavado! ¡Enhorabuena!";
  } else {
    return `Te has plantado con ${puntos} puntos.`;
  }
}

// ----------------- EVENTOS -----------------

/** 
 * Función para "Pedir Carta".
 */
const pedirCarta = (): void => {
  const numeroAleatorio = dameNumeroAleatorio();
  const carta = dameCarta(numeroAleatorio);
  console.log(`Carta pedida: ${carta}`);

  const urlCarta = obtenerUrlCarta(carta);
  mostrarUrlCarta(urlCarta);

  const puntosCarta = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntosCarta);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  gestionarPartida();
};

/**
 * Función para "¿Cuál hubiese sido mi próxima carta?".
 */
const cartaSiguiente = (): void => {
  const cartaFinal = dameCarta(dameNumeroAleatorio());
  const urlCartaFinal = obtenerUrlCarta(cartaFinal);
  mostrarUrlCarta(urlCartaFinal);
  const puntosCartaFinal = obtenerPuntosCarta(cartaFinal);
  const hipoteticaPuntuacion = obtenerHipoteticaPuntuacion(puntosCartaFinal);

  // Se deshabilita el botón para que solo se pueda usar una vez.
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.disabled = true;
  }

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
};

/**
 * Función para "Plantarse".
 */
const plantarse = (): void => {
  alert(obtenerMensajePlantarse(puntuacion));
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
    // Se habilita "cartaSiguiente" para un único uso.
    botonCartaSiguiente.disabled = false;
  }
};

/**
 * Función para "Nueva Partida".
 */
const nuevaPartida = (): void => {
  actualizarPuntuacion(0);
  muestraPuntuacion();
  // Se reestablece la carta por defecto (boca abajo).
  mostrarUrlCarta(
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"
  );
  // Se rehabilitan los botones de juego.
  habilitarJuego();
};

const botonPedirCarta = document.getElementById("pedirCarta");
if (botonPedirCarta instanceof HTMLButtonElement) {
  botonPedirCarta.addEventListener("click", pedirCarta);
}

const botonCartaSiguiente = document.getElementById("cartaSiguiente");
if (botonCartaSiguiente instanceof HTMLButtonElement) {
  botonCartaSiguiente.disabled = true;
  botonCartaSiguiente.addEventListener("click", cartaSiguiente);
}

const botonPlantarse = document.getElementById("plantarse");
if (botonPlantarse instanceof HTMLButtonElement) {
  botonPlantarse.addEventListener("click", plantarse);
}

const botonNuevaPartida = document.getElementById("nuevaPartida");
if (botonNuevaPartida instanceof HTMLButtonElement) {
  botonNuevaPartida.addEventListener("click", nuevaPartida);
}