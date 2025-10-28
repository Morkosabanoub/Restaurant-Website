// Select the custom cursor element
const cursor = document.querySelector(".custom-cursor");

// Move the custom cursor according to mouse movements
document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Select all circle elements (for rotation or scroll effects)
const circle = document.querySelectorAll(".circle");
let lastScroll = window.scrollY;
let rotation = 0;
let ticking = false;

// Select all FAQ question elements
const questions = document.querySelectorAll(".faq-question");

// Add click event to each question
questions.forEach((q) => {
  q.addEventListener("click", () => {
    // Close all other questions
    questions.forEach((other) => {
      if (other !== q) {
        other.classList.remove("active");
      }
    });

    // Toggle the clicked question
    q.classList.toggle("active");
  });
});

// Function to set the website theme (e.g., light/dark)
function setTheme(theme) {
  document.documentElement.className = theme;
}

// Execute after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the form and input elements
  const form = document.getElementById("contactForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Ensure there is an error span element next to the input
  function ensureErrorEl(el) {
    let next = el.nextElementSibling;
    if (next && next.classList && next.classList.contains("error-text"))
      return next;
    const span = document.createElement("span");
    span.className = "error-text";
    el.parentNode.insertBefore(span, el.nextSibling);
    return span;
  }

  // Clear error message from an input
  function clearError(el) {
    el.classList.remove("invalid");
    const err = el.nextElementSibling;
    if (err && err.classList && err.classList.contains("error-text"))
      err.textContent = "";
    el.removeAttribute("aria-invalid");
  }

  // Show an error message for a specific input
  function showError(el, msg) {
    el.classList.add("invalid");
    el.setAttribute("aria-invalid", "true");
    const err = ensureErrorEl(el);
    err.textContent = msg;
  }

  // Validate name input (2–40 letters, including Arabic letters)
  function validateName(val) {
    const nameRegex = /^[A-Za-z\u0600-\u06FF'\- ]{2,40}$/;
    if (!nameRegex.test(val))
      return "Please enter a valid name (2–40 letters).";
    return null;
  }

  // Validate email input
  function validateEmail(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(val)) return "Please enter a valid email address.";
    return null;
  }

  // Validate message input (minimum 10 characters)
  function validateMessage(val) {
    if (val.length < 10) return "Message must be at least 10 characters.";
    return null;
  }

  // Remove error messages while the user types
  [firstName, lastName, email, message].forEach((input) => {
    input.addEventListener("input", function () {
      clearError(input);
    });
  });

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const vFirst = String(firstName.value || "").trim();
    const vLast = String(lastName.value || "").trim();
    const vEmail = String(email.value || "").trim();
    const vMessage = String(message.value || "").trim();

    // Clear previous errors
    [firstName, lastName, email, message].forEach(clearError);

    let firstInvalid = null; // Track the first invalid field

    // Validate first name
    if (!vFirst) {
      showError(firstName, "Please enter your first name.");
      if (!firstInvalid) firstInvalid = firstName;
    } else {
      const err = validateName(vFirst);
      if (err) {
        showError(firstName, err);
        if (!firstInvalid) firstInvalid = firstName;
      }
    }

    // Validate last name
    if (!vLast) {
      showError(lastName, "Please enter your last name.");
      if (!firstInvalid) firstInvalid = lastName;
    } else {
      const err = validateName(vLast);
      if (err) {
        showError(lastName, err);
        if (!firstInvalid) firstInvalid = lastName;
      }
    }

    // Validate email
    if (!vEmail) {
      showError(email, "Please enter your email.");
      if (!firstInvalid) firstInvalid = email;
    } else {
      const err = validateEmail(vEmail);
      if (err) {
        showError(email, err);
        if (!firstInvalid) firstInvalid = email;
      }
    }

    // Validate message
    if (!vMessage) {
      showError(message, "Please write your message.");
      if (!firstInvalid) firstInvalid = message;
    } else {
      const err = validateMessage(vMessage);
      if (err) {
        showError(message, err);
        if (!firstInvalid) firstInvalid = message;
      }
    }

    // Focus on the first invalid field if any
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // If all fields are valid, show success message and reset form
    alert("Form submitted successfully!");
    form.reset();
    [firstName, lastName, email, message].forEach(clearError);
  });
});
