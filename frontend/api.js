const fetchContacts = async () => {
  try {
    const response = await fetch("/contacts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

const addContact = async (contact) => {
  try {
    const response = await fetch("/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      console.log("Contact added successfully.");
      return true;
    } else {
      console.error("Error adding contact:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error adding contact:", error);
    throw new Error("An error occurred while adding the contact.");
  }
};

const deleteContact = async (contact) => {
  try {
    const response = await fetch("/delete-contact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      console.log("Contact deleted successfully.");
      return true;
    } else {
      console.error("Error deleting contact:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("An error occurred while deleting the contact.");
  }
};

const updateContact = async (contact) => {
  try {
    const response = await fetch("/update-contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      console.log("Contact updated successfully.");
      return true;
    } else {
      console.error("Error updating contact:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("An error occurred while updating the contact.");
  }
};

export { addContact, deleteContact, updateContact, fetchContacts };
