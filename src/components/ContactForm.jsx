import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
          status: "unread",
        },
      ]);

      if (error) throw error;

      toast.success(
        "Thank you for your message! We will get back to you soon via email or WhatsApp."
      );
      reset();
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact_form" className="card">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="contactName"
              className="block text-lg font-extralight text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              id="contactName"
              type="text"
              className={`input-field ${
                errors.name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-lg text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-lg font-extralight text-gray-700 mb-1"
            >
              Email Address *
            </label>
            <input
              id="contactEmail"
              type="email"
              className={`input-field ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-lg text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="contactPhone"
            className="block text-lg font-extralight text-gray-700 mb-1"
          >
            Phone / WhatsApp Number
          </label>
          <input
            id="contactPhone"
            type="tel"
            className="input-field"
            placeholder="+971 55 XXX XXXX"
            {...register("phone")}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="contactSubject"
            className="block text-lg font-extralight text-gray-700 mb-1"
          >
            Subject *
          </label>
          <input
            id="contactSubject"
            type="text"
            className={`input-field ${
              errors.subject
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }`}
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <p className="mt-1 text-lg text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="contactMessage"
            className="block text-lg font-extralight text-gray-700 mb-1"
          >
            Message *
          </label>
          <textarea
            id="contactMessage"
            rows="5"
            className={`input-field ${
              errors.message
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }`}
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-lg text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
