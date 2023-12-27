import React, { useState, useEffect, ChangeEvent } from "react";
import { DescriptionProps } from "@/types";

export default function Description({ onDescriptionChange }: DescriptionProps) {
  const [description, setDescription] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  useEffect(() => {
    const storedDescription = localStorage.getItem("description");
    const storedHasStartedTyping = localStorage.getItem("hasStartedTyping");
    const storedValidation = localStorage.getItem("isDescriptionValid");

    setDescription(storedDescription || "");
    setHasStartedTyping(storedHasStartedTyping === "true");
    setIsDescriptionValid(storedValidation === "true");
  }, []);

  useEffect(() => {
    if (hasStartedTyping) {
      onDescriptionChange(description);
      localStorage.setItem("description", description);
      localStorage.setItem("hasStartedTyping", String(hasStartedTyping));
      localStorage.setItem("isDescriptionValid", String(isDescriptionValid));
    }
  }, [hasStartedTyping, description, isDescriptionValid, onDescriptionChange]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setHasStartedTyping(true);

    const isValid = newDescription.trim().length >= 4;
    setIsDescriptionValid(isValid);
    localStorage.setItem("description", newDescription);
    localStorage.setItem("hasStartedTyping", String(true));
    localStorage.setItem("isDescriptionValid", String(isValid));
  };

  return (
    <div className="flex flex-col mt-9 gap-2">
      <label>აღწერა *</label>
      <textarea
        value={description}
        onChange={handleInputChange}
        placeholder="შეიყვანეთ აღწერა"
        className={`w-[600px] h-[124px] indent-2 resize-none p-2 rounded-md outline-none ${
          hasStartedTyping
            ? isDescriptionValid
              ? "border-[1px] border-green-500 bg-green-200"
              : "border-[1px] border-red-500 bg-red-100"
            : "border-[1px] border-[#5d37f3]"
        }`}
      ></textarea>
      <p
        className={`mt-2 text-xs ${
          isDescriptionValid ? "text-green-500" : "text-red-500"
        }`}
      >
        {isDescriptionValid
          ? "მინიმუმ ოთხი სიმბოლო"
          : "აღწერილი ტექსტი უნდა იყოს 4 სიმბოლოზე მეტი"}
      </p>
    </div>
  );
}
