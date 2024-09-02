// Setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const colorPicker = document.getElementById('color');

// Função para gerar um número aleatório entre min e max
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Função para converter hex para RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return {r, g, b};
}

// Função para ajustar a intensidade da cor
function adjustColorIntensity(rgb, factor) {
    return `rgb(${Math.floor(rgb.r * factor)}, ${Math.floor(rgb.g * factor)}, ${Math.floor(rgb.b * factor)})`;
}

// Função para desenhar formas
function drawShape(x, y, size, shape, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (shape === 'square') {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
    } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();
    }
}

// Função para obter uma forma aleatória
function getRandomShape() {
    const shapes = ['circle', 'square', 'triangle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Função para desenhar e animar formas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colorValue = hexToRgb(colorPicker.value);
    for (let i = 0; i < 10; i++) {
        const intensityFactor = Math.random() * 0.5 + 0.5; // Intensidade entre 50% e 100%
        const adjustedColor = adjustColorIntensity(colorValue, intensityFactor);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 30 + 20; 
        const shape = getRandomShape();

        drawShape(x, y, size, shape, adjustedColor);
    }

    requestAnimationFrame(animate);
}

animate();

// Construtor para a forma geométrica
function Shape(x, y, velX, velY, size, shape, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.shape = shape;
    this.color = color;
}

// Método para desenhar a forma
Shape.prototype.draw = function () {
    drawShape(this.x, this.y, this.size, this.shape, this.color);
};

// Método para atualizar a posição da forma
Shape.prototype.update = function () {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

// Método para detectar colisões entre formas
Shape.prototype.collisionDetect = function () {
    for (let j = 0; j < shapes.length; j++) {
        if (!(this === shapes[j])) {
            const dx = this.x - shapes[j].x;
            const dy = this.y - shapes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + shapes[j].size) {
                shapes[j].color = this.color = adjustColorIntensity(hexToRgb(colorPicker.value), Math.random() * 0.5 + 0.5);
            }
        }
    }
};

let shapes = [];

// Adicionando formas geométricas à lista
while (shapes.length < 25) {
    let size = random(20, 50);
    let shape = new Shape(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-2, 2),  // Velocidade reduzida
        random(-2, 2),  // Velocidade reduzida
        size,
        getRandomShape(),
        adjustColorIntensity(hexToRgb(colorPicker.value), Math.random() * 0.5 + 0.5)
    );

    shapes.push(shape);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw();
        shapes[i].update();
        shapes[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
