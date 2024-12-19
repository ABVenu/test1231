// signup.js
import { BASE_URL } from "./baseUrl.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");

  form.addEventListener("submit", async () => {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value.trim();

    try {
      // Step 1: Check if the email already exists
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const users = await response.json();
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        alert("Email already signed up. Please log in.");
      } else {
        // Step 2: Add new user if email does not exist
        const newUser = { name, email, gender, age };
        const addUserResponse = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (addUserResponse.ok) {
          alert("Signup Successful!");
          form.reset(); // Clear the form
        } else {
          throw new Error("Failed to save user data.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An error occurred. Please try again later.");
    }
  });
});
