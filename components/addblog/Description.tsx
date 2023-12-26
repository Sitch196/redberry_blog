import React, { useState, ChangeEvent } from "react";

interface DescriptionProps {
  onDescriptionChange: (description: string) => void;
}

export default function Description({ onDescriptionChange }: DescriptionProps) {
  const [description, setDescription] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const isDescriptionValid = hasStartedTyping && description.trim().length >= 4;

  const PassToParent = () => {
    setHasStartedTyping(true);
    onDescriptionChange(description);
  };

  return (
    <div className="flex flex-col mt-9 gap-2">
      <label>აღწერა *</label>
      <textarea
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setDescription(e.target.value);
          PassToParent();
        }}
        placeholder="შეიყვანეთ აღწერა"
        className={`w-[600px] h-[124px] indent-2 resize-none p-2 rounded-md outline-none ${
          hasStartedTyping
            ? isDescriptionValid
              ? "border-[1px] border-green-500 bg-green-200"
              : "border-[1px] border-red-500 bg-red-100"
            : `border-[1px] border-[#5d37f3]`
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
