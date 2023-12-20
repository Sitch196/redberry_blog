"use client";
import Image from "next/image";
import logo from "../assets/logo.png";
import login from "../assets/shesvla.png";
import Modal from "./Modal";
import { useState } from "react";
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("modal open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between py-7 px-16 border-b border-gray-300">
      <Image
        src={logo}
        width={150}
        height={24}
        alt="redberry logo"
        className="cursor-pointer"
      />
      <Image
        src={login}
        width={93}
        height={35}
        alt="login img"
        className="cursor-pointer"
        onClick={openModal}
      />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
