import { useEffect, useState } from "react";
import { AuthorProps } from "@/types";

export default function Author({ onAuthorChange }: AuthorProps) {
  const [author, setAuthor] = useState("");
  const [isAuthorValid, setIsAuthorValid] = useState(false);

  useEffect(() => {
    const storedAuthor = localStorage.getItem("author");
    const storedValidation = localStorage.getItem("isAuthorValid");

    setAuthor(storedAuthor || "");
    setIsAuthorValid(storedValidation === "true");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAuthor = e.target.value;
    setAuthor(newAuthor);

    const isValid = newAuthor.trim().length >= 4;
    setIsAuthorValid(isValid);

    localStorage.setItem("author", newAuthor);
    localStorage.setItem("isAuthorValid", String(isValid));

    onAuthorChange({ author: newAuthor });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <label className="font-bold">ავტორი</label>
        <input
          type="text"
          placeholder="შეიყვანეთ ავტორი"
          value={author}
          className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
            isAuthorValid
              ? "border-[1px] border-green-500 bg-green-200"
              : "border-[1px] border-red-500 bg-red-100"
          }`}
          onChange={handleInputChange}
        />
        <p
          className={`text-xs ${
            isAuthorValid ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>*</span> მინიმუმ 4 სიმბოლო
        </p>
      </div>
    </div>
  );
}
