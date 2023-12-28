import React, { useState, useEffect, ChangeEvent } from "react";
import { DescriptionProps } from "@/types";

export default function Description({ onDescriptionChange }: DescriptionProps) {
  const [description, setDescription] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  useEffect(() => {
    const storedDescription = localStorage.getItem("description");
    const storedValidation = localStorage.getItem("isDescriptionValid");

    setDescription(storedDescription || "");
    setIsDescriptionValid(storedValidation === "true");
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    const isValid = newDescription.trim().length >= 4;
    setIsDescriptionValid(isValid);

    localStorage.setItem("description", newDescription);
    localStorage.setItem("isDescriptionValid", String(isValid));

    onDescriptionChange(newDescription);
  };

  return (
    <div className="flex flex-col mt-9 gap-2">
      <label>აღწერა *</label>
      <div
        className={`w-[600px] h-[124px] indent-2 p-2 rounded-md outline-none ${
          isDescriptionValid
            ? "border-[1px] border-green-500 bg-green-200"
            : "border-[1px] border-red-500 bg-red-100"
        }`}
        style={{
          whiteSpace: "pre-line",
          overflowWrap: "break-word",
        }}
      >
        <textarea
          value={description}
          onChange={handleInputChange}
          placeholder="შეიყვანეთ აღწერა"
          className="w-full h-full resize-none outline-none bg-transparent"
          style={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
        />
      </div>
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
