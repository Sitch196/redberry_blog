import { useState } from "react";

interface TitleProps {
  onTitleChange: (data: { title: string }) => void;
}

export default function Title({ onTitleChange }: TitleProps) {
  const [title, setTitle] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const istitleValid = hasStartedTyping && title.trim().length >= 4;

  const PassToParent = () => {
    setHasStartedTyping(true);
    onTitleChange({ title });
  };

  return (
    <div className="flex flex-col gap-2 mb-8">
      <label className="font-bold">სათაური</label>
      <input
        type="text"
        placeholder="შეიყვანეთ სათაური"
        value={title}
        className={`h-[45px] border-[2px] rounded-md indent-3 outline-none ${
          hasStartedTyping
            ? istitleValid
              ? "border-[1px] border-green-500 bg-green-200"
              : "border-[1px] border-red-500 bg-red-100"
            : "border-[1px] border-[#5d37f3]"
        }`}
        onChange={(e) => {
          setTitle(e.target.value);
          PassToParent();
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
