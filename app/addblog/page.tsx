"use client";
import Author from "@/components/addblog/Author";
import Description from "@/components/addblog/Description";
import PublishDate from "@/components/addblog/PublishDate";
import Email from "@/components/addblog/Email";
import Image from "next/image";
import publish from "../../assets/publish.png";
import UploadImage from "@/components/addblog/UploadImage";
import { useEffect, useState } from "react";
//////////////////////////////////////////////////////////////////////////////
export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [authorData, setAuthorData] = useState({ authorName: "", title: "" });
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [category, setCategory] = useState("აირჩიე კატეგორია");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const storedPostData = localStorage.getItem("postData");
    if (storedPostData) {
      const parsedPostData = JSON.parse(storedPostData);
      setImage(parsedPostData.file);
      setAuthorData(parsedPostData.author);
      setDescription(parsedPostData.description);
      setPublishDate(parsedPostData.publishDate);
      setCategory(parsedPostData.category);
      setEmail(parsedPostData.email);
    }
  }, []);

  ////////////////////////////////////////////////////////////////////

  const handleFileChange = (selectedFile: File | null) => {
    setImage(selectedFile);
  };

  const handleAuthorChange = (data: { authorName: string; title: string }) => {
    setAuthorData(data);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handlePublishDateChange = (value: string) => {
    setPublishDate(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsEmailValid(isValid);
  };

  const handleSubmit = () => {
    if (
      !image ||
      !authorData.authorName ||
      !authorData.title ||
      !description ||
      !publishDate ||
      category === "აირჩიე კატეგორია" ||
      !email ||
      !isEmailValid
    ) {
      console.error("Please fill out all required fields");
      return;
    }
    const postData = {
      image,
      author: authorData,
      description,
      publishDate,
      category,
      email,
    };

    localStorage.setItem("postData", JSON.stringify(postData));
    const SendForm = async () => {
      try {
        const response = await fetch(
          "https://api.blog.redberryinternship.ge/api/blogs",
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer 5beef7337a1817929e954d75ab5bf994d13f01ef9d90594491558429d5fa7602",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          console.log("Post request successful");
        } else {
          console.error("Post request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        localStorage.removeItem("postData");
      }
    };
    SendForm();

    console.log(postData);
  };
  return (
    <div className="flex  justify-center items-center">
      <div className="flex flex-col w-[600px] h-[1050px] mt-[30px] ">
        <UploadImage onFileChange={handleFileChange} />
        <Author onAuthorChange={handleAuthorChange} />
        <Description onDescriptionChange={handleDescriptionChange} />
        <PublishDate
          onPublishDateChange={handlePublishDateChange}
          onCategoryChange={handleCategoryChange}
        />
        <Email onEmailChange={handleEmailChange} />

        <div className="w-[600px] flex justify-end ">
          <Image
            className="mt-7  cursor-pointer h-[45px]"
            src={publish}
            alt="publish button"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
