"use client";
import { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import upload from "../../assets/upload.png";
import defaultimage from "../../assets/default.png";
import close from "../../assets/close.png";
import { UploadImageProps } from "@/types";

export default function UploadImage({
  onFileChange,
}: UploadImageProps): JSX.Element {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setImage(selectedFile || null);
    onFileChange(selectedFile || null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    setImage(selectedFile || null);
    onFileChange(selectedFile || null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start w-[600px]">
        <p className="text-[32px] font-bold">ბლოგის დამატება</p>
        <label className="text-sm mt-[40px]">ატვირთეთ ფოტო</label>
      </div>
      <div
        className={`bg-[#f4f3ff] w-[600px] h-[208px] mt-2 rounded-md border-[2px] border-dashed flex flex-col justify-center items-center ${
          image ? "bg-[#f2f2fa] h-[76px]" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!image ? (
          <>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Image
                src={upload}
                width={40}
                height={40}
                alt="upload "
                className="m-auto"
              />
              <p className="text-md mt-3">
                ჩააგდეთ ფაილი აქ ან{" "}
                <span className="font-bold underline">აირჩიეთ ფაილი</span>
              </p>
            </label>
          </>
        ) : (
          <div className="flex w-[600px] items-center  justify-between px-5">
            <div className="flex gap-3 items-center">
              <Image src={defaultimage} width={34} height={34} alt="default" />
              <p className="text-md ">{image.name}</p>
            </div>
            <span
              className="font-bold underline cursor-pointer  "
              onClick={() => setImage(null)}
            >
              <Image src={close} width={25} height={25} alt="close button" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
