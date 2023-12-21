"use client";
import React, { useState, ChangeEvent } from "react";

interface DescriptionProps {
  onDescriptionChange: (description: string) => void;
}

export default function Description({ onDescriptionChange }: DescriptionProps) {
  const [description, setDescription] = useState("");

  const isDescriptionValid = description.length >= 4;

  const PassToParrent = () => {
    onDescriptionChange(description);
  };

  return (
    <div className="flex flex-col mt-9 gap-2">
      <label>აღწერა *</label>
      <textarea
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setDescription(e.target.value);
          PassToParrent();
        }}
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
