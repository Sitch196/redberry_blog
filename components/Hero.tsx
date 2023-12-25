import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import heroImage from "../assets/heroImage.png";

const Hero = () => {
  return (
    <div className="flex justify-between items-center bg-[#ececee] pt-[79px] px-[89px]">
      <p className="text-7xl font-bold pt-4">ბლოგი</p>
      <div className="cursor-pointer">
        <Image
          src={heroImage}
          width={650}
          height={200}
          alt="heroimage"
          className="pt-[80px]"
        />
      </div>
    </div>
  );
};

export default Hero;
