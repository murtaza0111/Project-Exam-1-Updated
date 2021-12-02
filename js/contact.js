function contactForm() {
  event.preventDefault();
  let name = getFormFieldsData("name");
  let email = getFormFieldsData("email");
  let subject = getFormFieldsData("subject");
  let message = getFormFieldsData("message");

  if (validateData(name, email, subject, message)) {
    messageBox("Form submitted successfully", "contactMsg", "green");
  }
}

function messageBox(message, field, color) {
  document.getElementById(
    field
  ).innerHTML = `<span style=" color:${color}; font-size:1.4rem;margin:1rem; ">${message}</span>`;
}

function validateData(name, email, subject, message) {
  if (!validateValueLng(name, 5)) {
    messageBox("Name Should be 5 characters Long", "nameMsg", "red");
    return false;
  } else {
    messageBox(" ", "nameMsg", "green");
  }
  if (!validatEmail(email, 0)) {
    messageBox("Enter valid email address", "emailMsg", "red");
    return false;
  } else {
    messageBox(" ", "emailMsg", "green");
  }
  if (!validateValueLng(subject, 15)) {
    messageBox(
      "Subject should be minimum 15 characters long",
      "subjectMsg",
      "red"
    );
    return false;
  } else {
    messageBox(" ", "subjectMsg", "green");
  }
    if (!validateValueLng(message, 25)) {
    messageBox(
      "Message should be minimum 25 characters long",
      "messageMsg",
      "red"
    );
    return false;
  } else {
    messageBox(" ", "messageMsg", "green");
  }

  return true;
}

function validatEmail(data, charLng) {
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return data.trim().length > charLng &&
    validateEmail.test(String(data).toLowerCase())
    ? true
    : false;
}

function validateValueLng(data, charLng) {
  return data.trim().length >= charLng ? true : false;
}

function getFormFieldsData(fieldId) {
  return document.getElementById(fieldId).value;
}

document.getElementById("contact").addEventListener("submit", contactForm);
