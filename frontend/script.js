"use strict";
import { addContact, deleteContact } from "./api.js";

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
const duplicateNumberText = document.querySelector(".duplicateNumber");

// Contact Details
const contactNameInput = document.getElementById("contact_name");
const contactFirstNameInput = document.getElementById("contact_firstName");
const contactNumberInput = document.getElementById("contact_number");
const editContactBtn = document.querySelector(".edit-contact");
const deleteContactBtn = document.querySelector(".delete-contact");
const saveEditedContactBtn = document.querySelector(".save-edited-contact");
const favoriteBtn = document.querySelector(".favorite-btn");

// All contacts
const allContactsContainer = document.querySelector(".display-all-contacts");
const filters = document.querySelectorAll(".filter");

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

// FETCH CONTACTS FROM SERVER
let contactsArray;

const fetchContacts = async () => {
  try {
    const response = await fetch("/contacts");
    contactsArray = await response.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

fetchContacts();

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
  duplicateNumberText.textContent = "";
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
    if (contact.favorite) {
      const contactElement = document.createElement("div");
      contactElement.classList.add("contact");
      contactElement.innerHTML = `<p>${contact.fullName}</p>`;
      contactElement.contactData = contact;
      contactElement.setAttribute("data-name", contact.name);

      favoriteContacts.appendChild(contactElement);
    }
  });
};

// SHOWING FAVORITE CONTACT
const displayFavoriteContacts = (filteredValue) => {
  if (filteredValue) {
    let filteredArray = [];
    contactsArray.forEach((contact) => {
      if (
        contact.fullName.toLocaleLowerCase().includes(filteredValue) ||
        contact.number.includes(filteredValue)
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
const displayContacts = (filteredValue) => {
  if (filteredValue) {
    let filteredArray = [];
    contactsArray.forEach((contact) => {
      if (
        contact.fullName.toLocaleLowerCase().includes(filteredValue) ||
        contact.number.includes(filteredValue)
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

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    displayContacts(filter.value.toLowerCase());
    displayFavoriteContacts(filter.value.toLowerCase());
  });
});

const emptyFilters = () => {
  filters.forEach((filter) => (filter.value = ""));
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

      favoriteBtn.textContent = currentContact.favorite
        ? "Remove as favorite"
        : "Add as favorite";
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

// ADD/REMOVE CONTACT FROM FAVORITE
const updateFavoriteBtnText = () => {
  favoriteBtn.textContent = currentContact.favorite
    ? "Remove as favorite"
    : "Add as favorite";
};

favoriteBtn.addEventListener("click", () => {
  contactsArray.forEach((contact) => {
    if (contact === currentContact) {
      contact.favorite = !contact.favorite;
      updateFavoriteBtnText();
    }
  });
});

// SHOW UPDATED CONTACTS LIST
const resetHandlers = () => {
  emptyFilters();
  // Remove existing event handlers before attaching again
  removeContactClickHandlers();
  // Attach event handlers to contacts
  attachContactClickHandlers();
};

const updateContactList = (updatedPage) => {
  if (updatedPage === favoritesPage) {
    displayFavoriteContacts();
    showPage(updatedPage);
    resetHandlers();
  }

  if (updatedPage === contactsPage) {
    displayContacts();
    showPage(updatedPage);
    resetHandlers();
  }
};

//   EDIT CURRENT CONTACT
const checkIfEditing = (boolean) => {
  if (boolean) {
    contactNameInput.readOnly = false;
    contactFirstNameInput.readOnly = false;
    contactNumberInput.readOnly = false;
    contactNameInput.classList.remove("not-allow-edit");
    contactFirstNameInput.classList.remove("not-allow-edit");
    contactNumberInput.classList.remove("not-allow-edit");
  } else {
    contactNameInput.readOnly = true;
    contactFirstNameInput.readOnly = true;
    contactNumberInput.readOnly = true;
    contactNameInput.classList.add("not-allow-edit");
    contactFirstNameInput.classList.add("not-allow-edit");
    contactNumberInput.classList.add("not-allow-edit");
  }
};

editContactBtn.addEventListener("click", () => {
  editContactBtn.classList.toggle("hideBtn");
  saveEditedContactBtn.classList.toggle("hideBtn");
  checkIfEditing(true);
});

//   SAVE CHANGES
saveEditedContactBtn.addEventListener("click", () => {
  checkIfEditing();

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

const hideSaveBtn = () => {
  if (editContactBtn.classList.contains("hideBtn")) {
    editContactBtn.classList.toggle("hideBtn");
    saveEditedContactBtn.classList.toggle("hideBtn");
  }
};

//   DELETE CURRENT CONTACT
deleteContactBtn.addEventListener("click", async () => {
  try {
    const deletionSuccessful = await deleteContact(currentContact);
    if (deletionSuccessful) {
      contactsArray = contactsArray.filter(
        (contact) => contact !== currentContact
      );
      updateContactList(contactsPage);
      checkIfEditing();
      hideSaveBtn();
    } else {
      // Handle case where deletion was not successful
    }
  } catch (error) {
    // Handle error from deleteContact function
    console.error("Error deleting contact:", error);
  }
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
        duplicateNumberText.classList.remove("hidden");
        duplicateNumberText.textContent = `Number used for ${person.fullName}`;
        return;
      }
    });

    if (!isDuplicate) {
      const newContact = {
        name: inputName.value,
        firstName: inputFirstName.value,
        fullName: `${inputName.value} ${inputFirstName.value}`,
        number: inputNumber.value,
        favorite: false,
      };

      addContact(newContact);

      contactsArray.push(newContact);
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
  display.textContent = "";
  showPage(keypadPage);
  emptyInputFields();
  emptyFilters();
  hideAddNumberBtn();
  hideSaveBtn();
  checkIfEditing();
});

contactsIcon.addEventListener("click", () => {
  updateContactList(contactsPage);
  display.textContent = "";
  emptyInputFields();
  emptyFilters();
  hideAddNumberBtn();
  hideSaveBtn();
  checkIfEditing();
});

favoritesIcon.addEventListener("click", () => {
  updateContactList(favoritesPage);
  display.textContent = "";
  emptyInputFields();
  emptyFilters();
  hideAddNumberBtn();
  hideSaveBtn();
  checkIfEditing();
});
