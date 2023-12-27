import { useEffect, useState } from "react";
import { TitleProps } from "@/types";

export default function Title({ onTitleChange }: TitleProps) {
  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    const storedValidation = localStorage.getItem("isTitleValid");

    setTitle(storedTitle || "");
    setIsTitleValid(storedValidation === "true");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    const isValid = newTitle.trim().length >= 4;
    setIsTitleValid(isValid);

    localStorage.setItem("title", newTitle);
    localStorage.setItem("isTitleValid", String(isValid));

    onTitleChange({ title: newTitle });
  };

  return (
    <div className="flex flex-col gap-2 justify-end">
      <label className="font-bold">სათაური</label>
      <input
        type="text"
        placeholder="შეიყვანეთ სათაური"
        value={title}
        className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
          isTitleValid
            ? "border-[1px] border-green-500 bg-green-200"
            : "border-[1px] border-red-500 bg-red-100"
        }`}
        onChange={handleInputChange}
      />
      <p
        className={`text-xs ${
          isTitleValid ? "text-green-500" : "text-red-500"
        }`}
      >
        <span>*</span> მინუმუმ 4 სიმბოლო
      </p>
    </div>
  );
}
