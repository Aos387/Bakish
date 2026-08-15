const heart = document.getElementById("heart");

const total = 180;

const center = 300;

const scale = 15;

const words = [];


/*
    Creamos todos los BAKISH
*/

for (let i = 0; i < total; i++) {

    const text = document.createElement("span");

    text.classList.add("love");

    text.textContent = "BAKISH";

    heart.appendChild(text);

    words.push({
        element: text,

        // Posición inicial
        offset: (Math.PI * 2 * i) / total,

        // Velocidad ligeramente diferente
        speed: 0.00015 + Math.random() * 0.00008
    });
}


/*
    Calcula un punto del corazón
*/

function heartPosition(angle) {

    const x =
        16 * Math.pow(Math.sin(angle), 3);

    const y =
        13 * Math.cos(angle)
        - 5 * Math.cos(2 * angle)
        - 2 * Math.cos(3 * angle)
        - Math.cos(4 * angle);

    return {
        x: center + x * scale,
        y: center - y * scale
    };
}


/*
    Calcula la dirección del corazón
    para girar las palabras siguiendo
    la curva.
*/

function heartTangent(angle) {

    const x1 =
        16 * Math.pow(Math.sin(angle), 3);

    const y1 =
        13 * Math.cos(angle)
        - 5 * Math.cos(2 * angle)
        - 2 * Math.cos(3 * angle)
        - Math.cos(4 * angle);

    const next = angle + 0.01;

    const x2 =
        16 * Math.pow(Math.sin(next), 3);

    const y2 =
        13 * Math.cos(next)
        - 5 * Math.cos(2 * next)
        - 2 * Math.cos(3 * next)
        - Math.cos(4 * next);

    const dx = x2 - x1;
    const dy = -(y2 - y1);

    return Math.atan2(dy, dx) * 180 / Math.PI;
}


/*
    Animación
*/

function animate(time) {

    words.forEach((word) => {

        /*
            Hacemos que cada BAKISH avance
            alrededor del corazón.
        */

        const angle =
            word.offset + time * word.speed;

        const position =
            heartPosition(angle);

        const rotation =
            heartTangent(angle);

        word.element.style.left =
            `${position.x}px`;

        word.element.style.top =
            `${position.y}px`;

        word.element.style.transform =
            `translate(-50%, -50%) rotate(${rotation}deg)`;

    });

    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
