const contactForm = document.querySelector(".contact__form");
const submitButton = document.querySelector(".contact__button");

const statusMessage = document.createElement("p");
statusMessage.className = "form__status";
statusMessage.setAttribute("role", "status");
statusMessage.setAttribute("aria-live", "polite");
contactForm.appendChild(statusMessage);

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  statusMessage.textContent = "";
  statusMessage.className = "form__status";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    statusMessage.textContent =
        "✅ Thank you! Your message has been sent successfully. I'll get back to you as soon as possible.";
    statusMessage.classList.add("form__status--success");

    contactForm.reset();
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong. Please try again or contact me through LinkedIn.";
    statusMessage.classList.add("form__status--error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});