"use client";
import { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import upload from "../../assets/upload.png";
import defaultimage from "../../assets/default.png";
import close from "../../assets/close.png";
import Author from "@/components/addblog/Author";
import Description from "@/components/addblog/Description";
import PublishDate from "@/components/addblog/PublishDate";
import Email from "@/components/addblog/Email";
import publish from "../../assets/publish.png";
interface PageProps {}

export default function Page(props: PageProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    setFile(selectedFile || null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex  justify-center items-center">
      <div className="flex flex-col w-[600px] h-[1050px] mt-[30px]">
        <p className="text-[32px] font-bold">ბლოგის დამატება</p>
        <label className="text-sm mt-[40px]">ატვირთეთ ფოტო</label>
        <div
          className={`bg-[#f4f3ff] w-[600px] h-[208px] mt-2 rounded-md border-[2px] border-dashed flex flex-col justify-center items-center ${
            file ? "bg-[#f2f2fa] h-[76px]" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!file ? (
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
                <Image
                  src={defaultimage}
                  width={34}
                  height={34}
                  alt="default"
                />
                <p className="text-md ">{file.name}</p>
              </div>
              <span
                className="font-bold underline cursor-pointer  "
                onClick={() => setFile(null)}
              >
                <Image src={close} width={25} height={25} alt="close button" />
              </span>
            </div>
          )}
        </div>
        <Author />
        <Description />
        <PublishDate />
        <Email />

        <div className="w-[600px] flex justify-end ">
          <Image
            className="mt-7  cursor-pointer h-[45px]"
            src={publish}
            alt="publish button"
          />
        </div>
      </div>
    </div>
  );
}
