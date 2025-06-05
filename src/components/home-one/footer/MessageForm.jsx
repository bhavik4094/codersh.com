import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // for redirect
import Field from "../../common/Field";
import ArrowRight3Img from "../../../assets/images/icon/arrow-right3.svg";

function MessageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate(); // init navigate

  const autofillStyles = {
    WebkitAppearance: "none",
    backgroundImage: "none",
    backgroundColor: "transparent",
    color: "#ccc",
    transition:
      "background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
    fontSize: "18px",
  };

  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        try {
          const response = await fetch(
            "https://codersh.com/wp-json/custom/v1/submit-form",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          const result = await response.json();

          if (response.ok) {
            reset();
            navigate("/thank-you"); // ✅ Redirect to thank-you page
          } else {
            console.error("Submission failed:", result);
            alert("Form submission failed. Please try again.");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("An error occurred. Please try again.");
        }
      })}
    >
      {/* Name Field */}
      <div className="aximo-form-field">
        <Field error={errors.name}>
          <div>
            <input
              {...register("name", {
                required: "Name is required.",
              })}
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              style={autofillStyles}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
        </Field>
      </div>

      {/* Email Field */}
      <div className="aximo-form-field">
        <Field error={errors.email}>
          <div>
            <input
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              style={autofillStyles}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
        </Field>
      </div>

      {/* Mobile Number Field */}
      <div className="aximo-form-field">
        <Field error={errors.number}>
          <div>
            <input
              {...register("number", {
                required: "Mobile number is required.",
                pattern: {
                  value: /^[+0-9-]+$/,
                  message:
                    "Please enter a valid mobile number (only digits, +, and -).",
                },
                maxLength: {
                  value: 15,
                  message: "Mobile number cannot exceed 15 characters.",
                },
              })}
              type="tel"
              name="number"
              placeholder="Enter mobile number"
              style={autofillStyles}
            />
            {errors.number && (
              <p className="error-message">{errors.number.message}</p>
            )}
          </div>
        </Field>
      </div>

      {/* Message Field */}
      <div className="aximo-form-field">
        <Field error={errors.message}>
          <div>
            <textarea
              {...register("message", { required: "Message is required." })}
              name="message"
              placeholder="Write your message here..."
              style={autofillStyles}
            ></textarea>
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>
        </Field>
      </div>

      {/* Submit Button */}
      <button id="aximo-submit-btn" type="submit">
        Send message{" "}
        <span>
          <img src={ArrowRight3Img} alt="ArrowRight3Img" />
        </span>
      </button>
    </form>
  );
}

export default MessageForm;
