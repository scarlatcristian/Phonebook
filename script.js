"use strict";
// FOOTER
const keypad = document.querySelector(".keypad");
const favorites = document.querySelector(".favorites");
const contacts = document.querySelector(".contacts");

// ALL PAGES
const pages = document.querySelectorAll(".page");

// PAGES
const addNumberContainer = document.querySelector(".keypad-container");
const createContact = document.querySelector(".create-contact");

// Add Number Container
const addNumberBtn = document.querySelector(".add-number");
const display = document.querySelector(".display");
const keypadBtn = document.querySelectorAll(".keypad-btn");
const deleteBtn = document.querySelector(".delete");

// Create Contact
const inputName = document.querySelector(".input_name");
const inputFirstName = document.querySelector(".input_firstName");
const inputNumber = document.querySelector(".input_number");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");

let phoneNumber = "";

// Hide all pages
const hidePages = () => {
  pages.forEach((page) => page.classList.add("hidden"));
};

keypadBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    display.textContent += btn.textContent;
    phoneNumber = display.textContent;

    if (display.textContent !== "") {
      addNumberBtn.style.opacity = 1;
      addNumberBtn.removeAttribute("disabled");
      deleteBtn.style.opacity = 1;
    }
  });
});

deleteBtn.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  phoneNumber = display.textContent;

  if (display.textContent === "") {
    addNumberBtn.style.opacity = 0;
    addNumberBtn.setAttribute("disabled", "true");
    deleteBtn.style.opacity = 0;
  }
});

addNumberBtn.addEventListener("click", () => {
  display.textContent = "";
  inputName.focus();
  inputNumber.value = phoneNumber;
  hidePages();
  createContact.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  hidePages();
  addNumberContainer.classList.remove("hidden");
  addNumberBtn.style.opacity = 0;
  addNumberBtn.setAttribute("disabled", "true");
});

keypad.addEventListener("click", () => {
  if (addNumberContainer.classList.contains("hidden")) {
    hidePages();
    display.textContent = "";
    addNumberContainer.classList.remove("hidden");
    addNumberBtn.style.opacity = 0;
    addNumberBtn.setAttribute("disabled", "true");
  }
});
