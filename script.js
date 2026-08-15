const heart = document.getElementById("heart");


/* =========================
   CONFIGURACIÓN
   ========================= */

// Cantidad de palabras BAKISH
const total = 90;

// Centro del corazón
const center = 300;

// Tamaño del corazón
const scale = 15;

// Guardamos todas las palabras
const words = [];


/* =========================
   CREAR LOS BAKISH
   ========================= */

for (let i = 0; i < total; i++) {

    const text = document.createElement("span");

    text.classList.add("love");

    text.textContent = "BAKISH";

    heart.appendChild(text);


    /*
        Cada palabra empieza
        en un punto diferente
        del corazón.
    */

    words.push({

        element: text,

        angle:
            (Math.PI * 2 * i) / total,

        /*
            Velocidad de movimiento.

            Cada palabra tiene una
            velocidad ligeramente diferente.
        */

        speed:
            0.00035 +
            Math.random() * 0.00015
    });
}


/* =========================
   ECUACIÓN DEL CORAZÓN
   ========================= */

function heartPosition(angle) {

    /*
        Fórmula matemática
        del corazón.
    */

    const x =
        16 *
        Math.pow(
            Math.sin(angle),
            3
        );


    const y =
        13 * Math.cos(angle)
        - 5 * Math.cos(2 * angle)
        - 2 * Math.cos(3 * angle)
        - Math.cos(4 * angle);


    return {

        x:
            center +
            x * scale,

        y:
            center -
            y * scale
    };
}


/* =========================
   DIRECCIÓN DEL CORAZÓN
   ========================= */

function heartTangent(angle) {

    /*
        Calculamos un punto
        ligeramente posterior.
    */

    const next =
        angle + 0.01;


    /*
        Punto actual
    */

    const x1 =
        16 *
        Math.pow(
            Math.sin(angle),
            3
        );


    const y1 =
        13 * Math.cos(angle)
        - 5 * Math.cos(2 * angle)
        - 2 * Math.cos(3 * angle)
        - Math.cos(4 * angle);


    /*
        Punto siguiente
    */

    const x2 =
        16 *
        Math.pow(
            Math.sin(next),
            3
        );


    const y2 =
        13 * Math.cos(next)
        - 5 * Math.cos(2 * next)
        - 2 * Math.cos(3 * next)
        - Math.cos(4 * next);


    /*
        Dirección de movimiento
    */

    const dx =
        x2 - x1;


    const dy =
        -(y2 - y1);


    /*
        Convertimos a grados
    */

    return Math.atan2(
        dy,
        dx
    ) * 180 / Math.PI;
}


/* =========================
   ANIMACIÓN
   ========================= */

function animate(time) {

    words.forEach(
        (word, index) => {

            /*
                Hacemos que cada BAKISH
                avance por el corazón.
            */

            word.angle +=
                word.speed;


            /*
                Calculamos posición
            */

            const position =
                heartPosition(
                    word.angle
                );


            /*
                Calculamos orientación
            */

            const rotation =
                heartTangent(
                    word.angle
                );


            /*
                Pequeño movimiento
                vertical para darle
                algo de vida.
            */

            const wave =
                Math.sin(
                    time * 0.002 +
                    index
                ) * 1.5;


            /*
                Posición X
            */

            word.element.style.left =
                `${position.x}px`;


            /*
                Posición Y
            */

            word.element.style.top =
                `${position.y + wave}px`;


            /*
                Giramos BAKISH siguiendo
                la curva del corazón.
            */

            word.element.style.transform =
                `
                translate(-50%, -50%)
                rotate(${rotation}deg)
                `;
        }
    );


    /*
        Siguiente frame
    */

    requestAnimationFrame(
        animate
    );
}


/* =========================
   INICIAR
   ========================= */

requestAnimationFrame(
    animate
);
