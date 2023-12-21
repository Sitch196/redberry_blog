"use client";

import { useState } from "react";
interface TitleProps {
  onTitleChange: (data: { title: string }) => void;
}
export default function Title({ onTitleChange }: TitleProps) {
  const [title, setTitle] = useState("");

  const istitleValid = title.length >= 4;

  const PassToParrent = () => {
    onTitleChange({ title });
  };
  return (
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
  );
}
