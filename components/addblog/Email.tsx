import React, { useState, ChangeEvent } from "react";

interface EmailProps {
  onEmailChange: (value: string, isValid: boolean) => void;
}

const Email: React.FC<EmailProps> = ({ onEmailChange }) => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);

    const newIsValid = newEmail.endsWith("@redberry.ge");
    setIsValid(newIsValid);

    onEmailChange(newEmail, newIsValid);
  };

  return (
    <div className="flex flex-col gap-2 mt-9">
      <label>ელ-ფოსტა</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className={`w-[288px] h-[45px] border-[2px] rounded-md indent-3 outline-none ${
          isValid
            ? "border-[1px] border-[#5d37f3]"
            : "border-[1px] border-red-500 bg-red-100"
        }`}
      />
      {!isValid && (
        <p className="text-red-500 text-sm">
          მეილი უნდა მთავრდებოდეს @redberry.ge-ით
        </p>
      )}
    </div>
  );
};

export default Email;
