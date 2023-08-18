"use strict";
// FOOTER
const keypadIcon = document.querySelector(".keypad");
const favorites = document.querySelector(".favorites");
const contactsIcon = document.querySelector(".contacts");

// ALL PAGES
const pages = document.querySelectorAll(".page");

// PAGES
const keypadContainer = document.querySelector(".keypad-container");
const createContact = document.querySelector(".create-contact");
const contactsPage = document.querySelector(".contacts-page");
const contactDetails = document.querySelector(".contact-details");

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

// All Contacts Container

let phoneNumber = "";

// Hide all pages
const hidePages = (activePage) => {
  pages.forEach((page) => page.classList.add("hidden"));
  activePage.classList.remove("hidden");
};

// TODO: Placeholder contacts array
const contactsArray = [
  { name: "Vasile", firstName: "Tony", number: "0752654784" },
  { name: "Savin", firstName: "Ilie", number: "0726485034" },
  { name: "Scarlat", firstName: "Cristi", number: "0726485234" },
  { name: "Dache", firstName: "Marina", number: "0722485034" },
];

// ADDING THE NUMBER WHEN PRESSING THE BUTTONS
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

// DELETE THE NUMBER BTN
deleteBtn.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  phoneNumber = display.textContent;

  if (display.textContent === "") {
    addNumberBtn.style.opacity = 0;
    addNumberBtn.setAttribute("disabled", "true");
    deleteBtn.style.opacity = 0;
  }
});

// MOVING TO CREATE NEW CONTACT
addNumberBtn.addEventListener("click", () => {
  display.textContent = "";
  inputName.focus();
  inputNumber.value = phoneNumber;
  hidePages(createContact);
});

// CANCEL CREATING NEW CONTACT
cancelBtn.addEventListener("click", () => {
  hidePages(keypadContainer);
  addNumberBtn.style.opacity = 0;
  addNumberBtn.setAttribute("disabled", "true");
});

// SAVING THE NEW CONTACT
saveBtn.addEventListener("click", () => {
  if (
    inputName.value !== "" &&
    inputFirstName.value !== "" &&
    inputNumber.value !== ""
  ) {
    let isDuplicate = false;

    // Checking existing phone numbers for duplicates
    contactsArray.forEach((person) => {
      if (person.number === inputNumber.value) {
        isDuplicate = true;
        return;
      }
    });

    if (!isDuplicate) {
      let contact = {
        name: inputName.value,
        firstName: inputFirstName.value,
        number: inputNumber.value,
      };
      contactsArray.push(contact);
      hidePages(keypadContainer);

      // SHOWING ALL SAVED CONTACTS
      // Sorting the array alphabetically by name
      contactsPage.innerHTML = "";
      contactsArray.sort((a, b) => a.name.localeCompare(b.name));
      contactsArray.forEach((contact) => {
        let innerHTML = `
    <div class="contact">
        <p>${contact.name} ${contact.firstName}</p>
        <p style="display: none">${contact.number}</p>
        <p style="display: none">${contact.name}</p>
        <p style="display: none">${contact.firstName}</p>
    </div>
    `;
        contactsPage.innerHTML += innerHTML;
      });
    }

    inputName.value = "";
    inputFirstName.value = "";
    inputNumber.value = "";
  }
});

// SHOWING ALL SAVED CONTACTS
// Sorting the array alphabetically by name
contactsArray.sort((a, b) => a.name.localeCompare(b.name));
contactsArray.forEach((contact) => {
  let innerHTML = `
    <div class="contact">
        <p>${contact.name} ${contact.firstName}</p>
        <p style="display: none">${contact.number}</p>
        <p style="display: none">${contact.name}</p>
        <p style="display: none">${contact.firstName}</p>
    </div>
    `;
  contactsPage.innerHTML += innerHTML;
});

// FOOTER
keypadIcon.addEventListener("click", () => {
  if (keypadContainer.classList.contains("hidden")) {
    hidePages(keypadContainer);
    display.textContent = "";
    addNumberBtn.style.opacity = 0;
    addNumberBtn.setAttribute("disabled", "true");
    deleteBtn.style.opacity = 0;
  }
});

contactsIcon.addEventListener("click", () => {
  if (contactsPage.classList.contains("hidden")) {
    hidePages(contactsPage);
    display.textContent = "";
    addNumberBtn.style.opacity = 0;
    addNumberBtn.setAttribute("disabled", "true");
    deleteBtn.style.opacity = 0;

    // CONTACT DETAILS
    const contacts = document.querySelectorAll(".contact");
    contacts.forEach((contact) => {
      contact.addEventListener("click", () => {
        hidePages(contactDetails);
      });
    });
  }
});
