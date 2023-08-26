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
    throw error;
  }
};

export { addContact };
