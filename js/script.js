const luffy = document.querySelector(".luffy");
const barril = document.querySelector(".barril");
const clouds = document.querySelector(".clouds");

const jump = () => {
  luffy.classList.add("jump");

  setTimeout(() => {
    luffy.classList.remove("jump");
  }, 500);
};
const loop = setInterval(() => {
  const cloudsPosition = clouds.offsetLeft;
  const barrilPosition = barril.offsetLeft;
  const luffyPosition = +window
    .getComputedStyle(luffy)
    .bottom.replace("px", ""); // pegando todos estilos que foram setados no gif e acessando a propriedade bottom

  if (barrilPosition <= 135 && barrilPosition > 0 && luffyPosition < 80) {
    barril.style.animation = "none";
    barril.style.left = `${barrilPosition}px`;

    luffy.style.animation = "none";
    luffy.style.bottom = `${luffyPosition}px`;

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    clearInterval(loop);
  }
}, 10);
document.addEventListener("keydown", jump);
