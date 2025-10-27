import flagRu from "../images/flags/Flag_ru.svg";
import flagKz from "../images/flags/Flag_kz.svg";
import flagUz from "../images/flags/Flag_uz.svg";
import flagKg from "../images/flags/Flag_kg.svg";
import flagBd from "../images/flags/Flag_bd.svg";

import mainRu from "../images/bonus/main-bonus-ru.svg";
import mainKz from "../images/bonus/main-bonus-kz.svg";
import mainUz from "../images/bonus/main-bonus-uz.svg";
import mainKg from "../images/bonus/main-bonus-kg.svg";
import mainBd from "../images/bonus/main-bonus-bd.svg";

import icon1 from "../images/bonus/bonus-1.svg";
import icon2 from "../images/bonus/bonus-2.svg";

import ru1 from "../images/bonus/bonus-text-ru-1.svg";
import ru2 from "../images/bonus/bonus-text-ru-2.svg";
import ru3 from "../images/bonus/bonus-text-ru-3.svg";
import ru4 from "../images/bonus/bonus-text-ru-4.svg";

import kz1 from "../images/bonus/bonus-text-kz-1.svg";
import kz2 from "../images/bonus/bonus-text-kz-2.svg";
import kz3 from "../images/bonus/bonus-text-kz-3.svg";
import kz4 from "../images/bonus/bonus-text-kz-4.svg";

import uz1 from "../images/bonus/bonus-text-uz-1.svg";
import uz2 from "../images/bonus/bonus-text-uz-2.svg";
import uz3 from "../images/bonus/bonus-text-uz-3.svg";
import uz4 from "../images/bonus/bonus-text-uz-4.svg";

import kg1 from "../images/bonus/bonus-text-kg-1.svg";
import kg2 from "../images/bonus/bonus-text-kg-2.svg";
import kg3 from "../images/bonus/bonus-text-kg-3.svg";
import kg4 from "../images/bonus/bonus-text-kg-4.svg";

import bd1 from "../images/bonus/bonus-text-bd-1.svg";
import bd2 from "../images/bonus/bonus-text-bd-2.svg";
import bd3 from "../images/bonus/bonus-text-bd-3.svg";
import bd4 from "../images/bonus/bonus-text-bd-4.svg";

const languageBtn = document.querySelector(".language-container__button");
const languageList = document.querySelector(".language-list");
const currentFlag = document.getElementById("current-flag");

const flags = {
  ru: flagRu,
  kz: flagKz,
  uz: flagUz,
  kg: flagKg,
  bd: flagBd,
};

const mainPrizeByLocale = {
  ru: mainRu,
  kz: mainKz,
  uz: mainUz,
  kg: mainKg,
  bd: mainBd,
};

const prizeTextsByLocale = {
  ru: [ru1, ru2, icon2, icon2, ru3, icon1, ru4, icon2],
  kz: [kz1, kz2, icon2, icon2, kz3, icon1, kz4, icon2],
  uz: [uz1, uz2, icon2, icon2, uz3, icon1, uz4, icon2],
  kg: [kg1, kg2, icon2, icon2, kg3, icon1, kg4, icon2],
  bd: [bd1, bd2, icon2, icon2, bd3, icon1, bd4, icon2],
};

//подгрузка бонусов с соответствующей валютой
function updateWheelTexts(locale) {
  const textElements = document.querySelectorAll(".bonus-item img");
  const texts = prizeTextsByLocale[locale];

  textElements.forEach((img, i) => {
    img.src = texts[i];
  });
}

//подгрузка главного приза в зависимости от языка
function updateMainPrize(locale) {
  const mainPrizeImg = document.querySelector(".bonus-popup__prize-top img");
  if (mainPrizeImg && mainPrizeByLocale[locale]) {
    mainPrizeImg.src = mainPrizeByLocale[locale];
  }
}

//переключение списка языков
languageBtn.addEventListener("click", () => {
  languageList.classList.toggle("hidden");
});

languageList.addEventListener("click", (event) => {
  const li = event.target.closest(".language-list__item");

  if (!li) return;

  const lang = li.dataset.lang;
  if (!lang || !flags[lang]) return;

  currentFlag.src = flags[lang];
  updateWheelTexts(lang);
  updateMainPrize(lang);

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
