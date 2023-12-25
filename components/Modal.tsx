// Import Success component
import Success from "./Success";

import close from "../assets/close.png";
import Image from "next/image";
import enterbtn from "../assets/enterbtn.png";
import React, { useState } from "react";
import info from "../assets/info.png";
import { useAuth } from "@/Context/AuthContext";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { setLoggedin } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    validateEmail(inputValue);
  };

  const validateEmail = (input: string) => {
    const isValid = input.endsWith("@redberry.ge");
    setIsValidEmail(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValidEmail) return;
    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.status === 204) {
        setLoggedin(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="absolute w-[480px] h-[272px] bg-white p-4 z-10 rounded-lg">
        <p className="text-xl text-center font-bold mt-6">შესვლა</p>
        <Image
          src={close}
          width={28}
          height={28}
          onClick={onClose}
          className="absolute top-5 right-5 cursor-pointer"
          alt="close button"
        />

        <div className="flex flex-col gap-3">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label>ელ-ფოსტა</label>
              <input
                className={`h-[45px] border-2 rounded-md ${
                  isValidEmail ? "border-[#5d37f3]" : "border-red-500"
                } indent-3 outline-none`}
                type="text"
                placeholder="Example@redberry.ge"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            {!isValidEmail && (
              <div className="flex gap-1">
                <Image src={info} width={20} height={12} alt="info" />
                <p className="text-red-500 text-sm">
                  ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge
                </p>
              </div>
            )}
            <Image
              src={enterbtn}
              alt=" btn"
              className="mt-4 m-auto cursor-pointer"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
      <div
        className="absolute inset-0 cursor-pointer  bg-black bg-opacity-50"
        onClick={onClose}
      />
    </div>
  );
};

export default Modal;
