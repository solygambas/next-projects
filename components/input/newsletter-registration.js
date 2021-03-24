import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function NewsletterRegistration() {
  const notificationContext = useContext(NotificationContext);
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    notificationContext.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });
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
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((data) => {
              throw new Error(data.message || "Something went wrong."); // catch will work
            });
          })
          .then((data) => {
            notificationContext.showNotification({
              title: "Success!",
              message: "Successfully registered for newsletter!",
              status: "success",
            });
          })
          .catch((error) => {
            notificationContext.showNotification({
              title: "Error!",
              message: error.message || "Something went wrong.",
              status: "error",
            });
          });
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
