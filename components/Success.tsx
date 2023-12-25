import Image from "next/image";
import checkmark from "../assets/checkmark.png";
import close from "../assets/close.png";
import React from "react";
import Link from "next/link";

interface textTypes {
  Text: string;
  buttonText: string;
  onClose: () => void;
}

export default function Success({ Text, buttonText, onClose }: textTypes) {
  return (
    <div
      onClick={onClose}
      className="fixed cursor-pointer top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex flex-col gap-8 relative justify-center items-center bg-white w-[480px] h-[300px] rounded-md p-8">
        <Image
          src={close}
          width={28}
          height={28}
          className="absolute top-5 right-5 cursor-pointer"
          alt="close button"
          onClick={onClose}
        />
        <Image src={checkmark} width={64} alt="checkmark" />
        <p className="text-lg font-bold">{Text}</p>

        <Link href="/">
          <button
            className="w-[432px] bg-[#4c29d8] rounded-md p-2 text-white font-bold"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
