import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function NewsletterRegistration() {
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input
    if (enteredEmail) {
      const isValid = validateEmail(enteredEmail);
      if (isValid) {
        // send valid data to API
        const reqBody = { email: enteredEmail };
        fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
