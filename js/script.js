const luffy = document.querySelector(".luffy");
const barril = document.querySelector(".barril");
const clouds = document.querySelector(".clouds");
const carnes = document.querySelectorAll(".carne"); // Seleciona todas as carnes
const scoreDisplay = document.getElementById("score");
let score = 0;
let loop; // Variável para armazenar o loop do jogo

const jump = () => {
  luffy.classList.add("jump");

  setTimeout(() => {
    luffy.classList.remove("jump");
  }, 500);
};

// Função para verificar colisão
const checkCollision = (element1, element2) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.right > rect2.left &&
    rect1.left < rect2.right &&
    rect1.bottom > rect2.top &&
    rect1.top < rect2.bottom
  );
};

// Função para pausar o jogo, mantendo o estado atual do Luffy, barril e nuvens
const stopGame = (
  barrilPosition,
  luffyPosition,
  cloudsPosition,
  carnePositions
) => {
  barril.style.animation = "none";
  barril.style.left = `${barrilPosition}px`;

  luffy.style.animation = "none";
  luffy.style.bottom = `${luffyPosition}px`;

  clouds.style.animation = "none";
  clouds.style.left = `${cloudsPosition}px`;

  clearInterval(loop);
};

// Função para gerar posição aleatória da carne
const randomPosition = (carne) => {
  const randomValue = Math.random() * 400; // Gera um valor aleatório entre 0 e 400 para a posição "bottom"
  carne.style.bottom = `${randomValue}px`;
};

// Função para sumir com a carne e incrementar o placar
const collectCarne = (carne) => {
  carne.style.display = "none"; // Faz a carne desaparecer
  score++;
  scoreDisplay.textContent = score; // Atualiza o placar

  // Reseta a carne após 1 segundo e coloca em nova posição aleatória
  setTimeout(() => {
    carne.style.display = "block"; // Mostra a carne novamente
    randomPosition(carne); // Gera nova posição aleatória
  }, 1000);
};

// Loop do jogo
loop = setInterval(() => {
  const luffyPosition = +window
    .getComputedStyle(luffy)
    .bottom.replace("px", "");
  const barrilPosition = barril.offsetLeft;

  // Verifica colisão do Luffy com o barril
  if (barrilPosition <= 135 && barrilPosition > 0 && luffyPosition < 80) {
    stopGame(barrilPosition, luffyPosition, 0, []); // Para o jogo
  }

  // Verifica colisão com as carnes
  carnes.forEach((carne) => {
    if (checkCollision(luffy, carne)) {
      collectCarne(carne); // Remove a carne e aumenta o placar
    }
  });
}, 10);

// Evento para pular
document.addEventListener("keydown", jump);

// Gera posições aleatórias para todas as carnes ao iniciar o jogo
carnes.forEach((carne) => {
  randomPosition(carne); // Define posição aleatória inicial
});
