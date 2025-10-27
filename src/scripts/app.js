const btn = document.querySelector(".wheel__button");
const wheel = document.querySelector(".wheel__main");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".bonus-popup__close");
const buttonGetBonus = document.querySelector(".bonus-popup__btn");

let currentRotation = 0;
let isSpinning = false;
const spinAngle = 360 * 5;

btn.addEventListener("click", () => {
  //чтобы не было повторного клика
  if (isSpinning) return;

  isSpinning = true;
  btn.classList.add("is-pressed");

  //добавляю анимацию нажатия
  setTimeout(() => {
    btn.classList.remove("is-pressed");
  }, 150);

  //сбрасываю положение колеса перед новым вращением
  wheel.style.transform = "rotate(0deg)";
  wheel.style.animation = "none";

  //запускаю вращение после предыдыщего сброса
  requestAnimationFrame(() => {
    currentRotation += spinAngle;
    wheel.style.transition = "transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;
  });

  setTimeout(() => {
    isSpinning = false;
    btn.classList.remove("disabled");
    //плавное появление оверлей-слоя с регистрацией
    overlay.classList.add("is-open");
  }, 4000);
});

close.addEventListener("click", () => {
  overlay.classList.remove("is-open");
});

buttonGetBonus.addEventListener("click", () => {
  overlay.classList.remove("is-open");
});
