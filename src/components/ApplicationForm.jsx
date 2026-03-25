import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, ChevronRight, Upload, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import CurrencySelector from "./CurrencySelector";
import OrderSummary from "./OrderSummary";
import { getPrice, formatPrice } from "../utils/pricing";

function ApplicationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [currency, setCurrency] = useState("USD");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const visaType = watch("visaType");

  const stepLabels = [
    "Personal Info",
    "Visa Details",
    "Payment",
    "Documents",
  ];

  const onSubmit = (data) => {
    if (step < 4) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      const finalData = {
        ...formData,
        ...data,
        currency,
        paymentStatus: "paid",
      };
      console.log("Final Application Data:", finalData);
      toast.success(
        "Application submitted successfully! We will contact you via email and WhatsApp with updates."
      );
    }
  };

  const goBack = () => {
    if (step === 4 && paymentComplete) return;
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      toast.success(
        "Payment simulation successful! In production, Stripe checkout will handle this."
      );
    }, 2000);
  };

  return (
    <div id="apply_application-form" className="card">
      <div className="flex items-center justify-between mb-8">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i + 1
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i + 1 ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <span className="text-lg font-extralight text-gray-500 mt-1 hidden sm:block">
                {label}
              </span>
            </div>

            {i < stepLabels.length - 1 && (
              <div
                className={`h-1 w-10 sm:w-16 md:w-24 lg:w-32 mx-1 ${
                  step > i + 1 ? "bg-primary-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`input-field ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`input-field ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="email"
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

              <div>
                <label
                  htmlFor="phone"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+971 55 XXX XXXX"
                  className={`input-field ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="nationality"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Nationality *
                </label>
                <select
                  id="nationality"
                  className={`input-field ${
                    errors.nationality
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("nationality", {
                    required: "Nationality is required",
                  })}
                >
                  <option value="">Select your nationality</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="South Africa">South Africa</option>
                  <option value="DR Congo">DR Congo</option>
                  <option value="Congo">Congo</option>
                  <option value="Angola">Angola</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nationality && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.nationality.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Date of Birth *
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  className={`input-field ${
                    errors.dateOfBirth
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="passportNumber"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Passport Number *
                </label>
                <input
                  id="passportNumber"
                  type="text"
                  className={`input-field ${
                    errors.passportNumber
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("passportNumber", {
                    required: "Passport number is required",
                  })}
                />
                {errors.passportNumber && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.passportNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="passportExpiry"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Passport Expiry Date *
                </label>
                <input
                  id="passportExpiry"
                  type="date"
                  className={`input-field ${
                    errors.passportExpiry
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("passportExpiry", {
                    required: "Passport expiry date is required",
                  })}
                />
                {errors.passportExpiry && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.passportExpiry.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Visa Details
            </h3>

            <div className="mb-6">
              <label
                htmlFor="visaType"
                className="block text-lg font-extralight text-gray-700 mb-1"
              >
                Visa Type *
              </label>
              <select
                id="visaType"
                className={`input-field ${
                  errors.visaType
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                {...register("visaType", {
                  required: "Visa type is required",
                })}
              >
                <option value="">Select visa type</option>
                <option value="30 Days Tourist Visa">
                  30 Days Tourist Visa
                </option>
                <option value="60 Days Tourist Visa">
                  60 Days Tourist Visa
                </option>
                <option value="60 Days Multiple Entry">
                  60 Days Multiple Entry
                </option>
                <option value="Transit Visa">Transit Visa</option>
              </select>
              {errors.visaType && (
                <p className="mt-1 text-lg text-red-600">
                  {errors.visaType.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="entryDate"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Expected Entry Date *
                </label>
                <input
                  id="entryDate"
                  type="date"
                  className={`input-field ${
                    errors.entryDate
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("entryDate", {
                    required: "Entry date is required",
                  })}
                />
                {errors.entryDate && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.entryDate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="travelPurpose"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Purpose of Travel *
                </label>
                <select
                  id="travelPurpose"
                  className={`input-field ${
                    errors.travelPurpose
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("travelPurpose", {
                    required: "Purpose of travel is required",
                  })}
                >
                  <option value="">Select purpose</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Business">Business</option>
                  <option value="Family Visit">Family Visit</option>
                  <option value="Medical">Medical</option>
                  <option value="Transit">Transit</option>
                  <option value="Other">Other</option>
                </select>
                {errors.travelPurpose && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.travelPurpose.message}
                  </p>
                )}
              </div>
            </div>

            {visaType === "60 Days Multiple Entry" && (
              <div className="mb-6">
                <label
                  htmlFor="previousVisit"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Have you visited UAE before? *
                </label>
                <select
                  id="previousVisit"
                  className={`input-field ${
                    errors.previousVisit
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  {...register("previousVisit", {
                    required:
                      "This field is required for 60 Days Multiple Entry visa",
                  })}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.previousVisit && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.previousVisit.message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="accommodation"
                className="block text-lg font-extralight text-gray-700 mb-1"
              >
                Accommodation in Dubai *
              </label>
              <select
                id="accommodation"
                className={`input-field ${
                  errors.accommodation
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                {...register("accommodation", {
                  required: "Accommodation details are required",
                })}
              >
                <option value="">Select accommodation type</option>
                <option value="Hotel">Hotel</option>
                <option value="Family/Friends">Family/Friends</option>
                <option value="Apartment">Apartment</option>
                <option value="Not booked yet">Not booked yet</option>
              </select>
              {errors.accommodation && (
                <p className="mt-1 text-lg text-red-600">
                  {errors.accommodation.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="additionalInfo"
                className="block text-lg font-extralight text-gray-700 mb-1"
              >
                Additional Information (Optional)
              </label>
              <textarea
                id="additionalInfo"
                rows="3"
                className="input-field"
                placeholder="Any special requirements or information we should know"
                {...register("additionalInfo")}
              ></textarea>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Payment
            </h3>
            <p className="text-lg font-extralight text-gray-600 mb-6">
              Select your preferred currency and complete payment to proceed
              with your application.
            </p>

            <div className="mb-6">
              <CurrencySelector
                currency={currency}
                setCurrency={setCurrency}
              />
            </div>

            <div className="bg-gray-50 rounded-md p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                Selected Visa
              </h4>
              <p className="text-lg font-extralight text-gray-600">
                {formData.visaType || "Not selected"}
              </p>
              {formData.visaType && (
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  {formatPrice(getPrice(formData.visaType, currency), currency)}
                </p>
              )}
            </div>

            {!paymentComplete ? (
              <OrderSummary
                visaType={formData.visaType}
                currency={currency}
                onProceedToPayment={handleProceedToPayment}
                isLoading={isProcessing}
              />
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-green-800 mb-2">
                  Payment Successful
                </h4>
                <p className="text-lg font-extralight text-green-700">
                  Your payment has been processed. Please proceed to upload your
                  documents.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Document Upload
            </h3>
            <p className="text-lg font-extralight text-gray-600 mb-6">
              Please upload clear, color scans or photos of the following
              documents.
            </p>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="passportCopy"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Passport Copy (First and Last Page) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-lg font-extralight text-gray-500 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-lg font-extralight text-gray-400">
                    Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                  </p>
                  <input
                    id="passportCopy"
                    type="file"
                    className="hidden"
                    {...register("passportCopy", {
                      required: "Passport copy is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("passportCopy").click()
                    }
                    className="mt-4 btn-secondary py-2 px-4"
                  >
                    Select File
                  </button>
                </div>
                {errors.passportCopy && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.passportCopy.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="photograph"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Recent Photograph (White Background) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-lg font-extralight text-gray-500 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-lg font-extralight text-gray-400">
                    Accepted formats: JPG, PNG (Max size: 2MB)
                  </p>
                  <input
                    id="photograph"
                    type="file"
                    className="hidden"
                    {...register("photograph", {
                      required: "Photograph is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("photograph").click()
                    }
                    className="mt-4 btn-secondary py-2 px-4"
                  >
                    Select File
                  </button>
                </div>
                {errors.photograph && (
                  <p className="mt-1 text-lg text-red-600">
                    {errors.photograph.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="flightItinerary"
                  className="block text-lg font-extralight text-gray-700 mb-1"
                >
                  Flight Itinerary (if available)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-lg font-extralight text-gray-500 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-lg font-extralight text-gray-400">
                    Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                  </p>
                  <input
                    id="flightItinerary"
                    type="file"
                    className="hidden"
                    {...register("flightItinerary")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("flightItinerary").click()
                    }
                    className="mt-4 btn-secondary py-2 px-4"
                  >
                    Select File
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    {...register("terms", {
                      required:
                        "You must agree to the terms and conditions",
                    })}
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-lg font-extralight text-gray-600"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary-600 hover:underline"
                  >
                    terms and conditions
                  </a>{" "}
                  and understand that no refund is provided if my visa is
                  rejected.
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-lg text-red-600">
                  {errors.terms.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && !(step === 3 && paymentComplete) ? (
            <button type="button" onClick={goBack} className="btn-secondary">
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step === 3 ? (
            paymentComplete ? (
              <button
                type="button"
                onClick={() => {
                  setStep(4);
                  window.scrollTo(0, 0);
                }}
                className="btn-primary"
              >
                Continue to Documents
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            ) : null
          ) : (
            <button type="submit" className="btn-primary">
              {step < 4 ? (
                <>
                  Next Step
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
