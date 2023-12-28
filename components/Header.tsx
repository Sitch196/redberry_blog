"use client";
import Image from "next/image";
import logo from "../assets/logo.png";
import login from "../assets/shesvla.png";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import Success from "./Success";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { loggedin, setLoggedin }: any = useAuth();

  useEffect(() => {
    const loginState = localStorage.getItem("login");
    setLoggedin(loginState);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    if (loggedin && !isModalOpen) {
      localStorage.setItem("login", loggedin);

      const successShownBefore = localStorage.getItem("successShownBefore");
      if (!successShownBefore) {
        setShowSuccess(true);
        localStorage.setItem("successShownBefore", "true");

        setTimeout(() => setShowSuccess(false), 7000);
      }
    }
  }, [loggedin, isModalOpen]);

  return (
    <div className="flex justify-between sticky top-0 py-7 px-16 border-b bg-white border-gray-300">
      <Link href="/">
        <Image
          src={logo}
          width={150}
          height={24}
          alt="redberry logo"
          className="cursor-pointer"
        />
      </Link>
      {!loggedin ? (
        <Image
          src={login}
          width={93}
          height={35}
          alt="login img"
          className="cursor-pointer"
          onClick={openModal}
        />
      ) : (
        <Link href="addblog">
          <button className="bg-[#5d37f3] p-[10px] text-[14px] rounded-xl text-white font-bold">
            დაამატე ბლოგი
          </button>
        </Link>
      )}
      {showSuccess && (
        <Success
          Text="წარმატებული ავტორიზაცია"
          buttonText="კარგი"
          onClose={closeSuccess}
        />
      )}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
