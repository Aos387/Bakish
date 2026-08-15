const heart = document.getElementById("heart");


/* =========================
   CONFIGURACIÓN
   ========================= */

const total = 90;

const center = 300;

const scale = 15;

const words = [];


/* =========================
   CREAR LOS BAKISH
   ========================= */

for (let i = 0; i < total; i++) {

    const text = document.createElement("span");

    text.classList.add("love");

    text.textContent = "BAKISH";

    heart.appendChild(text);


    words.push({

        element: text,

        angle:
            (Math.PI * 2 * i) / total,

        speed:
            0.00035 +
            Math.random() * 0.00015
    });
}


/* =========================
   ECUACIÓN DEL CORAZÓN
   ========================= */

function heartPosition(angle) {

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

    const next =
        angle + 0.01;


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


    const dx =
        x2 - x1;


    const dy =
        -(y2 - y1);


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

            word.angle +=
                word.speed;


            const position =
                heartPosition(
                    word.angle
                );


            const rotation =
                heartTangent(
                    word.angle
                );


            const wave =
                Math.sin(
                    time * 0.002 +
                    index
                ) * 1.5;


            word.element.style.left =
                `${position.x}px`;


            word.element.style.top =
                `${position.y + wave}px`;


            word.element.style.transform =
                `
                translate(-50%, -50%)
                rotate(${rotation}deg)
                `;
        }
    );


    requestAnimationFrame(
        animate
    );
}


requestAnimationFrame(
    animate
);
