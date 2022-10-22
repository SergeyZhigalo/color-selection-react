import { useState } from "react";
import chroma from "chroma-js";

export function useColors() {
  // переменная hash хранит в себе цвета из адресной строки
  let hash = window.location.hash.split("-");

  const [colors, setColors] = useState([
    { color: hash[0] || getColor(), lock: false },
    { color: hash[1] || getColor(), lock: false },
    { color: hash[2] || getColor(), lock: false },
    { color: hash[3] || getColor(), lock: false },
    { color: hash[4] || getColor(), lock: false },
  ]);

  // функция getColor возвращает случайный цвет
  function getColor(){
    return chroma.random().hex();
  }

  // функция firstRender производит первичный рендеринг
  function firstRender(){
    const column = document.getElementsByClassName("column");
    for (let i = 0; i < colors.length; i++) {
      column[i].style.backgroundColor = colors[i].color;
    }
    window.location.hash = colors.map((color) => color.color).join("-");
  }

  // функция generateColor производит повторный рендеринг
  function generateColor() {
    const column = document.getElementsByClassName("column");
    for (let i = 0; i < column.length; i++) {
      if (!colors[i].lock) {
        const newColor = getColor();
        const newColors = [...colors];
        newColors[i].color = newColor;
        column[i].style.backgroundColor = newColor;
        setColors(newColors);
        window.location.hash = colors.map((color) => color.color).join("-");
      }
    }
  }

  // функция lockColor меняет значение lock на противоположное
  function lockColor(index) {
    const newColors = [...colors];
    newColors[index].lock = !newColors[index].lock;
    setColors(newColors);
  }

  // функция copyToClipboard копирует цвет в буфер обмена
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  return {
    colors,
    firstRender,
    generateColor,
    lockColor,
    copyToClipboard,
  }
}