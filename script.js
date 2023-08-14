"use strict";
const addNumberBtn = document.querySelector(".add-number");

const display = document.querySelector(".display");
const keypadBtn = document.querySelectorAll(".keypad");
const deleteBtn = document.querySelector(".delete");

let phoneNumberDisplay = "";

keypadBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    display.textContent += btn.textContent;
    if (display.textContent !== "") {
      addNumberBtn.style.opacity = 1;
      deleteBtn.style.opacity = 1;
    }
  });
});

deleteBtn.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    addNumberBtn.style.opacity = 0;
    deleteBtn.style.opacity = 0;
  }
});
