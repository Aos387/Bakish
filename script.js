const heart = document.getElementById("heart");

// Número de palabras que formarán el corazón
const total = 700;

// Tamaño del corazón
const scale = 14;

for (let i = 0; i < total; i++) {

    // Ángulo
    const t = (Math.PI * 2 * i) / total;

    /*
        Ecuación matemática del corazón

        x = 16 sin³(t)

        y = 13cos(t)
            - 5cos(2t)
            - 2cos(3t)
            - cos(4t)
    */

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    // Crear el texto
    const text = document.createElement("span");

    text.classList.add("love");

    text.textContent = "Bakish";

    /*
        Convertimos las coordenadas matemáticas
        en coordenadas de pantalla.
    */

    const posX = 250 + x * scale;
    const posY = 250 - y * scale;

    text.style.left = `${posX}px`;
    text.style.top = `${posY}px`;

    // Pequeña variación de tamaño
    text.style.fontSize =
        `${7 + Math.random() * 5}px`;

    // Variación de brillo
    text.style.opacity =
        `${0.5 + Math.random() * 0.5}`;

    // Añadir al corazón
    heart.appendChild(text);
}
