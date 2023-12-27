import React, { useEffect, useState } from "react";

interface AuthorProps {
  onAuthorChange: (data: { author: string }) => void;
}

export default function Author({ onAuthorChange }: AuthorProps) {
  const [author, setAuthor] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const isAuthorValid = hasStartedTyping && author.trim().length >= 4;
  const isTitleWordCountValid = author.split(/\s+/).filter(Boolean).length >= 2;
  const isTitleKartuliValid =
    hasStartedTyping && /^[ა-ჰ]+$/.test(author.replace(/\s/g, ""));
  const isFormValid =
    isAuthorValid && isTitleWordCountValid && isTitleKartuliValid;

  useEffect(() => {
    const storedAuthor = localStorage.getItem("author");
    const storedHasStartedTyping = localStorage.getItem("hasStartedTyping");

    setAuthor(storedAuthor || "");
    setHasStartedTyping(storedHasStartedTyping === "true");
  }, []);

  const PassToParent = () => {
    setHasStartedTyping(true);
    onAuthorChange({ author });
    localStorage.setItem("author", author);
    localStorage.setItem("hasStartedTyping", String(true));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col mt-5 gap-2">
        <label className="font-bold">ავტორი</label>
        <input
          type="text"
          value={author}
          placeholder="შეიყვანეთ ავტორი"
          onChange={(e) => {
            setAuthor(e.target.value);
            PassToParent();
          }}
          className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
            hasStartedTyping
              ? isFormValid
                ? "border-[1px] border-green-500 bg-green-200"
                : "border-[1px] border-red-500 bg-red-100"
              : "border-[1px] border-[#5d37f3]"
          }`}
        />
        <p
          className={`text-xs ${
            isAuthorValid ? "text-green-500" : "text-red-500"
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
