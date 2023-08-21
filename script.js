"use strict";
// FOOTER
const keypadIcon = document.querySelector(".keypad");
const favoritesIcon = document.querySelector(".favorites");
const contactsIcon = document.querySelector(".contacts");

// ALL PAGES
const pages = document.querySelectorAll(".page");

// PAGES
const keypadPage = document.querySelector(".keypad-page");
const createContact = document.querySelector(".create-contact");
const contactsPage = document.querySelector(".contacts-page");
const contactDetails = document.querySelector(".contact-details");
const favoritesPage = document.querySelector(".favorites-page");

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

// All contacts
const allContactsContainer = document.querySelector(".display-all-contacts");
const filter = document.querySelector(".filter");

// Favorite contacts
const favoriteContacts = document.querySelector(".display-all-favorites");

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
  {
    id: 1,
    name: "Vasile",
    firstName: "Tony",
    fullName: "Vasile Tony",
    number: "0752654784",
    favorite: false,
  },
  {
    id: 2,
    name: "Stici",
    firstName: "Robert",
    fullName: "Stici Robert",
    number: "0752254784",
    favorite: false,
  },
  {
    id: 3,
    name: "Savin",
    firstName: "Ilie",
    fullName: "Savin Ilie",
    number: "0726485034",
    favorite: false,
  },
  {
    id: 4,
    name: "Scarlat",
    firstName: "Cristi",
    fullName: "Scarlat Cristi",
    number: "0726485234",
    favorite: true,
  },
  {
    id: 5,
    name: "Dache",
    firstName: "Marina",
    fullName: "Dache Marina",
    number: "0722485034",
    favorite: false,
  },
  {
    id: 6,
    name: "Vas",
    firstName: "Ioana",
    fullName: "Vas Ioana",
    number: "0722425034",
    favorite: false,
  },
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

// Empty Input Fields
const emptyInputFields = () => {
  inputName.value = "";
  inputFirstName.value = "";
  inputNumber.value = "";
};

// CANCEL CREATING NEW CONTACT
cancelBtn.addEventListener("click", () => {
  showPage(keypadPage);
  emptyInputFields();
  hideAddNumberBtn();
});

const showAllContacts = (array) => {
  allContactsContainer.innerHTML = "";

  // Sorting the array alphabetically by name
  array.sort((a, b) => a.name.localeCompare(b.name));
  array.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.classList.add("contact");
    contactElement.innerHTML = `<p>${contact.fullName}</p>`;
    contactElement.contactData = contact;
    contactElement.setAttribute("data-name", contact.name);

    allContactsContainer.appendChild(contactElement);
  });
};

const showAllFavoriteContacts = (array) => {
  favoriteContacts.innerHTML = "";

  // Sorting the array alphabetically by name
  array.sort((a, b) => a.name.localeCompare(b.name));
  array.forEach((contact) => {
    if (contact.favorite === true) {
      const contactElement = document.createElement("div");
      contactElement.classList.add("contact");
      contactElement.innerHTML = `<p>${contact.fullName}</p>`;
      contactElement.contactData = contact;
      contactElement.setAttribute("data-name", contact.name);

      favoriteContacts.appendChild(contactElement);
    }
  });
};

//TODO: SHOWING FAVORITE CONTACT
const displayFavoriteContacts = (filterValue) => {
  if (filterValue) {
    let filteredArray = [];
    contactsArray.forEach((contact) => {
      if (
        contact.fullName.toLocaleLowerCase().includes(filterValue) ||
        contact.number.includes(filterValue)
      ) {
        filteredArray.push(contact);
      }
    });
    showAllFavoriteContacts(filteredArray);
    attachContactClickHandlers(); // Attach event handlers to the filtered contacts
  } else {
    showAllFavoriteContacts(contactsArray);
    attachContactClickHandlers(); // Attach event handlers to all contacts
  }
};

// SHOWING ALL SAVED CONTACTS
const displayContacts = (filterValue) => {
  if (filterValue) {
    let filteredArray = [];
    contactsArray.forEach((contact) => {
      if (
        contact.fullName.toLocaleLowerCase().includes(filterValue) ||
        contact.number.includes(filterValue)
      ) {
        filteredArray.push(contact);
      }
    });
    showAllContacts(filteredArray);
    attachContactClickHandlers(); // Attach event handlers to the filtered contacts
  } else {
    showAllContacts(contactsArray);
    attachContactClickHandlers(); // Attach event handlers to all contacts
  }
};

filter.addEventListener("input", () => {
  displayContacts(filter.value.toLowerCase());
  displayFavoriteContacts(filter.value.toLowerCase());
});

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

// SHOW UPDATED CONTACTS LIST
const updateContactList = (updatedPage) => {
  if (updatedPage === favoritesPage) {
    displayFavoriteContacts();
    showPage(updatedPage);
    filter.value = "";

    // Remove existing event handlers before attaching again
    removeContactClickHandlers();
    // Attach event handlers to contacts
    attachContactClickHandlers();
  }

  if (updatedPage === contactsPage) {
    displayContacts();
    showPage(updatedPage);
    filter.value = "";

    // Remove existing event handlers before attaching again
    removeContactClickHandlers();
    // Attach event handlers to contacts
    attachContactClickHandlers();
  }
};

//   DELETE CURRENT CONTACT
deleteContactBtn.addEventListener("click", () => {
  contactsArray = contactsArray.filter((contact) => contact !== currentContact);
  updateContactList(contactsPage);
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
});

//   SAVE CHANGES
saveEditedContactBtn.addEventListener("click", () => {
  contactNameInput.readOnly = true;
  contactFirstNameInput.readOnly = true;
  contactNumberInput.readOnly = true;

  contactsArray.map((contact) => {
    if (contact === currentContact) {
      contact.name = contactNameInput.value;
      contact.firstName = contactFirstNameInput.value;
      contact.number = contactNumberInput.value;
      contact.fullName = `${contactNameInput.value} ${contactFirstNameInput.value}`;
    }
    updateContactList(contactsPage);
  });

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
        fullName: `${inputName.value} ${inputFirstName.value}`,
        number: inputNumber.value,
      };
      contactsArray.push(contact);
      showPage(keypadPage);

      emptyInputFields();
      hideAddNumberBtn();
      displayContacts();
    }
  }
});

// FOOTER
keypadIcon.addEventListener("click", () => {
  if (!keypadPage.classList.contains("hidden")) {
    return;
  }

  showPage(keypadPage);
  display.textContent = "";
  hideAddNumberBtn();
});

contactsIcon.addEventListener("click", () => {
  updateContactList(contactsPage);
  display.textContent = "";
  filter.value = "";

  hideAddNumberBtn();
  hideSaveBtn();
});

favoritesIcon.addEventListener("click", () => {
  updateContactList(favoritesPage);
  display.textContent = "";
  filter.value = "";

  hideAddNumberBtn();
  hideSaveBtn();
});

// TODO: In contact details add btn check if contact is favorite or not -> display btn remove/add to favorite
// TODO: Create visual effect when when pressing edit contact
