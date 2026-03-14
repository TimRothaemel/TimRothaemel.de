import emailjs from '@emailjs/browser';

emailjs.init("IcDUeahyb3vLGAwak");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "SERVICE_ID",
    "TEMPLATE_ID",
    this
  ).then(
    () => {
      alert("Message sent!");
      form.reset();
    },
    (error) => {
      alert("Failed to send message");
      console.log(error);
    }
  );
});