"use client";
import React, { useState } from "react";
interface AuthorProps {
  onAuthorChange: (data: { author: string }) => void;
}

export default function Author({ onAuthorChange }: AuthorProps) {
  const [author, setAuthor] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const isauthorValid = hasStartedTyping && author.length >= 4;
  const isTitleWordCountValid =
    hasStartedTyping && author.split(" ").length >= 2;
  const isTitleKartuliValid =
    hasStartedTyping && /^[ა-ჰ]+$/.test(author.replace(/\s/g, ""));
  const isFormValid =
    isauthorValid && isTitleWordCountValid && isTitleKartuliValid;

  const PassToParrent = () => {
    setHasStartedTyping(true);
    onAuthorChange({ author });
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-col mt-5 gap-2">
        <label className="font-bold">ავტორი</label>
        <input
          type="text"
          value={author}
          placeholder="შეიყვანეთ ავტორი"
          onChange={(e) => {
            setAuthor(e.target.value);
            PassToParrent();
          }}
          className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
            hasStartedTyping
              ? isFormValid
                ? "border-green-500 bg-green-200"
                : "border-red-500 bg-red-100"
              : "border-[#5d37f3]"
          }`}
        />
        <p
          className={`text-xs ${
            isauthorValid ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>*</span> მინიმუმ 4 სიმბოლო
        </p>
        <p
          className={`text-xs ${
            isTitleWordCountValid ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>*</span> მინუმუმ ორი სიტყვა
        </p>
        <p
          className={`text-xs ${
            isTitleKartuliValid ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>*</span> მხოლოდ ქართული სიმბოლოები
        </p>
      </div>
    </div>
  );
}
