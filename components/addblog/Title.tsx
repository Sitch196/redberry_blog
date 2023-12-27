import { useEffect, useState } from "react";
import { TitleProps } from "@/types";

export default function Title({ onTitleChange }: TitleProps) {
  const [title, setTitle] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    const storedHasStartedTyping = localStorage.getItem("hasStartedTyping");
    const storedValidation = localStorage.getItem("isTitleValid");

    setTitle(storedTitle || "");
    setHasStartedTyping(storedHasStartedTyping === "true");
    setIsTitleValid(storedValidation === "true");
  }, []);

  useEffect(() => {
    if (hasStartedTyping) {
      onTitleChange({ title });
      localStorage.setItem("title", title);
      localStorage.setItem("hasStartedTyping", String(hasStartedTyping));
      localStorage.setItem("isTitleValid", String(isTitleValid));
    }
  }, [hasStartedTyping, title, isTitleValid, onTitleChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setHasStartedTyping(true);

    const isValid = newTitle.trim().length >= 4;
    setIsTitleValid(isValid);
    localStorage.setItem("title", newTitle);
    localStorage.setItem("hasStartedTyping", String(true));
    localStorage.setItem("isTitleValid", String(isValid));
  };

  return (
    <div className="flex flex-col gap-2 justify-end">
      <label className="font-bold">სათაური</label>
      <input
        type="text"
        placeholder="შეიყვანეთ სათაური"
        value={title}
        className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
          hasStartedTyping
            ? isTitleValid
              ? "border-[1px] border-green-500 bg-green-200"
              : "border-[1px] border-red-500 bg-red-100"
            : "border-[1px] border-[#5d37f3]"
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
