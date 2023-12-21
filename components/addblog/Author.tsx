"use client";
import React, { useState } from "react";
interface AuthorProps {
  onAuthorChange: (data: { author: string }) => void;
}

export default function Author({ onAuthorChange }: AuthorProps) {
  const [author, setAuthor] = useState("");

  const isauthorValid = author.length >= 4;
  const isTitleWordCountValid = author.split(" ").length >= 2;
  const isTitleKartuliValid = /^[ა-ჰ]+$/.test(author.replace(/\s/g, ""));
  const isFormValid =
    isauthorValid && isTitleWordCountValid && isTitleKartuliValid;

  const PassToParrent = () => {
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
          className={`h-[45px] border-[2px] rounded-md border-[#5d37f3] indent-3 outline-none ${
            isFormValid ? "border-green-500" : "border-red-500"
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
