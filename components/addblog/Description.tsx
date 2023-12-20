"use client";

import { useState } from "react";

export default function Description() {
  const [description, setDescription] = useState("");

  const isDescriptionValid = description.length >= 4;

  return (
    <div className="flex flex-col mt-9 gap-2">
      <label>აღწერა *</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="შეიყვანეთ აღწერა"
        className={`w-[600px] h-[124px] resize-none border-2 rounded-md p-2 outline-none ${
          isDescriptionValid ? "border-green-500" : "border-gray-200"
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
