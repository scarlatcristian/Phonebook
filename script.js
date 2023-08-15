"use strict";
// PAGES
const addNumberContainer = document.querySelector(".keypad-container");
const createContact = document.querySelector(".create-contact");
console.log(createContact);

// Add Number Container
const addNumberBtn = document.querySelector(".add-number");
const display = document.querySelector(".display");
const keypadBtn = document.querySelectorAll(".keypad");
const deleteBtn = document.querySelector(".delete");

// Create Contact
const inputName = document.querySelector(".input_name");
const inputFirstName = document.querySelector(".input_firstName");
const inputNumber = document.querySelector(".input_number");

let phoneNumber = "";

keypadBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    display.textContent += btn.textContent;
    phoneNumber = display.textContent;
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

addNumberBtn.addEventListener("click", () => {
  inputNumber.value = phoneNumber;
  addNumberContainer.classList.add("hidden");
  createContact.classList.remove("hidden");
});
