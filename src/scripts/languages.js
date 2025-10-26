import flagRu from "../images/flags/Flag_ru.svg";
import flagKz from "../images/flags/Flag_kz.svg";
import flagUz from "../images/flags/Flag_uz.svg";
import flagKg from "../images/flags/Flag_kg.svg";
import flagBd from "../images/flags/Flag_bd.svg";

import wheelRu from "../images/wheels/wheel_ru.png";
import wheelKz from "../images/wheels/wheel_kz.png";
import wheelUz from "../images/wheels/wheel_uz.png";
import wheelKg from "../images/wheels/wheel_kg.png";
import wheelBd from "../images/wheels/wheel_bd.png";

const languageBtn = document.querySelector(".language-container__button");
const languageList = document.querySelector(".language-list");
const currentFlag = document.getElementById("current-flag");
const wheelImage = document.querySelector(".wheel__base");

const flags = {
  ru: flagRu,
  kz: flagKz,
  uz: flagUz,
  kg: flagKg,
  bd: flagBd,
};

const wheels = {
  ru: wheelRu,
  kz: wheelKz,
  uz: wheelUz,
  kg: wheelKg,
  bd: wheelBd,
};

//переключение списка языков
languageBtn.addEventListener("click", () => {
  languageList.classList.toggle("hidden");
});

languageList.addEventListener("click", (event) => {
  const li = event.target.closest(".language-list__item");

  if (!li || !languageList.contains(li)) return;

  const lang = li.dataset.lang;
  if (!lang || !flags[lang]) return;

  currentFlag.src = flags[lang];
  wheelImage.src = wheels[lang];

  languageList.querySelectorAll(".language-list__item").forEach((item) => {
    item.classList.remove("selected");
  });

  li.classList.add("selected");
  languageList.classList.add("hidden");
});

//поддержка клавиатуры

languageList.addEventListener("keydown", (event) => {
  const li = event.target.closest(".language-list__item");
  if (!li || !languageList.contains(li)) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();

    //беру логику клика
    li.click();
  }
});
