"use client";
import React, { useEffect, useState } from "react";
interface AuthorProps {
  onAuthorChange: (data: { authorName: string; title: string }) => void;
}

export default function Author({ onAuthorChange }: AuthorProps) {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");

  const isAuthorNameValid = authorName.length >= 4;
  const isTitleWordCountValid = authorName.split(" ").length >= 2;
  const isTitleKartuliValid = /^[ა-ჰ]+$/.test(authorName.replace(/\s/g, ""));
  const istitleValid = title.length >= 4;
  const isFormValid =
    isAuthorNameValid && isTitleWordCountValid && isTitleKartuliValid;

  const PassToParrent = () => {
    onAuthorChange({ authorName, title });
  };
  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-col mt-5 gap-2">
        <label className="font-bold">ავტორი</label>
        <input
          type="text"
          value={authorName}
          placeholder="შეიყვანეთ ავტორი"
          onChange={(e) => {
            setAuthorName(e.target.value);
            PassToParrent();
          }}
          className={`h-[45px] border-[2px] rounded-md border-[#5d37f3] indent-3 outline-none ${
            isFormValid ? "border-green-500" : "border-red-500"
          }`}
        />
        <p
          className={`text-xs ${
            isAuthorNameValid ? "text-green-500" : "text-red-500"
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
      <div className="flex flex-col gap-2 mb-8">
        <label className="font-bold">სათაური</label>
        <input
          type="text"
          placeholder="შეიყვანეთ სათაური"
          value={title}
          className={`h-[45px] border-[2px] rounded-md ${
            istitleValid ? "border-green-500" : "border-red-500"
          } border-[#5d37f3] indent-3 outline-none 
            
          }`}
          onChange={(e) => {
            setTitle(e.target.value);
            PassToParrent();
          }}
        />
        <p
          className={`text-xs 
          ${istitleValid ? "text-green-500" : "text-red-500"}
          }`}
        >
          <span>*</span> მინუმუმ 4 სიმბოლო
        </p>
      </div>
    </div>
  );
}
