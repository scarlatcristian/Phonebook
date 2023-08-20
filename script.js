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

// Contact Details
const contactNameInput = document.querySelector(".contact_name");
const contactFirstNameInput = document.querySelector(".contact_firstName");
const contactNumberInput = document.querySelector(".contact_number");
const editContactBtn = document.querySelector(".edit-contact");
const deleteContactBtn = document.querySelector(".delete-contact");
const saveEditedContactBtn = document.querySelector(".save-edited-contact");

let phoneNumber = "";

// Hide all pages
const showPage = (activePage) => {
  pages.forEach((page) => page.classList.add("hidden"));
  activePage.classList.remove("hidden");
};

const hideAddNumberBtn = () => {
  addNumberBtn.style.opacity = 0;
  addNumberBtn.setAttribute("disabled", "true");
  deleteBtn.style.opacity = 0;
};

// TODO: Placeholder contacts array
let contactsArray = [
  { name: "Vasile", firstName: "Tony", number: "0752654784" },
  { name: "Stici", firstName: "Robert", number: "0752254784" },
  { name: "Savin", firstName: "Ilie", number: "0726485034" },
  { name: "Scarlat", firstName: "Cristi", number: "0726485234" },
  { name: "Dache", firstName: "Marina", number: "0722485034" },
  { name: "Vas", firstName: "Ioana", number: "0722425034" },
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
    hideAddNumberBtn();
  }
});

// MOVING TO CREATE NEW CONTACT
addNumberBtn.addEventListener("click", () => {
  display.textContent = "";
  inputName.focus();
  inputNumber.value = phoneNumber;
  showPage(createContact);
});

// CANCEL CREATING NEW CONTACT
cancelBtn.addEventListener("click", () => {
  showPage(keypadContainer);
  hideAddNumberBtn();
});

// SHOWING ALL SAVED CONTACTS
// Sorting the array alphabetically by name
const showAllContacts = () => {
  contactsPage.innerHTML = "";

  contactsArray.sort((a, b) => a.name.localeCompare(b.name));
  contactsArray.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.classList.add("contact");
    contactElement.innerHTML = `<p>${contact.name} ${contact.firstName}</p>`;
    contactElement.contactData = contact;
    contactElement.setAttribute("data-name", contact.name);

    contactsPage.appendChild(contactElement);
  });
};

// CONTACT DETAILS
// Array to store references to event handlers
let contactEventHandlers = [];
let currentContact;

const attachContactClickHandlers = () => {
  const contacts = document.querySelectorAll(".contact");

  contacts.forEach((contact) => {
    const eventHandler = () => {
      showPage(contactDetails);

      currentContact = contact.contactData;
      contactNameInput.value = currentContact.name;
      contactFirstNameInput.value = currentContact.firstName;
      contactNumberInput.value = currentContact.number;
    };

    // Store the event handler reference
    contactEventHandlers.push(eventHandler);
    contact.addEventListener("click", eventHandler);
  });
};

const removeContactClickHandlers = () => {
  const contacts = document.querySelectorAll(".contact");

  contacts.forEach((contact, index) => {
    contact.removeEventListener("click", contactEventHandlers[index]);
  });

  contactEventHandlers = [];
};

//   DELETE CURRENT CONTACT
deleteContactBtn.addEventListener("click", () => {
  contactsArray = contactsArray.filter((contact) => contact !== currentContact);
  console.log(contactsArray);
  showPage(keypadContainer);
});

const hideSaveBtn = () => {
  if (editContactBtn.classList.contains("hideBtn")) {
    editContactBtn.classList.toggle("hideBtn");
    saveEditedContactBtn.classList.toggle("hideBtn");
  }
};

//   EDIT CURRENT CONTACT
editContactBtn.addEventListener("click", () => {
  contactNameInput.readOnly = false;
  contactFirstNameInput.readOnly = false;
  contactNumberInput.readOnly = false;

  editContactBtn.classList.toggle("hideBtn");
  saveEditedContactBtn.classList.toggle("hideBtn");
  console.log(currentContact);
});

//   SAVE CHANGES
saveEditedContactBtn.addEventListener("click", () => {
  contactNameInput.readOnly = true;
  contactFirstNameInput.readOnly = true;
  contactNumberInput.readOnly = true;

  hideSaveBtn();
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
      showPage(keypadContainer);

      contactsPage.innerHTML = "";
      inputName.value = "";
      inputFirstName.value = "";
      inputNumber.value = "";
      hideAddNumberBtn();
      showAllContacts();
    }
  }
});

// FOOTER
keypadIcon.addEventListener("click", () => {
  if (!keypadContainer.classList.contains("hidden")) {
    return;
  }

  showPage(keypadContainer);
  display.textContent = "";
  hideAddNumberBtn();
});

contactsIcon.addEventListener("click", () => {
  if (!contactsPage.classList.contains("hidden")) {
    return;
  }
  showAllContacts();
  showPage(contactsPage);
  display.textContent = "";

  hideAddNumberBtn();
  hideSaveBtn();

  // Remove existing event handlers before attaching again
  removeContactClickHandlers();
  // Attach event handlers to contacts
  attachContactClickHandlers();
});
