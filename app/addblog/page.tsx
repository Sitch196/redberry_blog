"use client";
import Author from "@/components/addblog/Author";
import Description from "@/components/addblog/Description";
import PublishDate from "@/components/addblog/PublishDate";
import Email from "@/components/addblog/Email";
import Image from "next/image";
import publish from "../../assets/publish.png";
import UploadImage from "@/components/addblog/UploadImage";
import { useState } from "react";
import Title from "@/components/addblog/Title";
import Categories from "@/components/addblog/Categories";

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [categories, setCategories] = useState("აირჩიე კატეგორია");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    setImage(selectedFile);
    validateForm();
  };

  const handleAuthorChange = (data: { author: string }) => {
    setAuthor(data.author);
    validateForm();
  };

  const handleTitleChange = (data: { title: string }) => {
    setTitle(data.title);
    validateForm();
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    validateForm();
  };

  const handlePublishDateChange = (value: string) => {
    setPublish_date(value);
    validateForm();
  };

  const handleCategoryChange = (value: string) => {
    setCategories(value);
    validateForm();
  };

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsEmailValid(isValid);
    validateForm();
  };

  const validateForm = () => {
    const isImageValid = !!image;
    const isAuthorValid =
      author.length >= 4 ||
      author.split(" ").length >= 2 ||
      /^[ა-ჰ]+$/.test(author.replace(/\s/g, ""));
    const isTitleValid = title.length >= 4;
    const isDescriptionValid = description.length >= 4;
    const isPublishDateValid = !!publish_date;
    const isCategoryValid = categories !== "აირჩიე კატეგორია";
    const isEmailFieldValid = !!email;

    setIsFormValid(
      isImageValid &&
        isAuthorValid &&
        isTitleValid &&
        isDescriptionValid &&
        isPublishDateValid &&
        (isCategoryValid || categories === "აირჩიე კატეგორია") &&
        isEmailFieldValid &&
        isEmailValid
    );
  };
  const handleSubmit = async () => {
    if (
      !image ||
      !author ||
      !title ||
      !description ||
      !publish_date ||
      categories === "აირჩიე კატეგორია" ||
      !email ||
      !isEmailValid ||
      !isFormValid
    ) {
      console.error("Please fill out all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("author", author);
    formData.append("publish_date", publish_date);
    formData.append("categories", categories);
    formData.append("email", email);
    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/blogs",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 5f4f8ea35e48816ce488d1061017c83931743eac88ffbbd65f9a6fc878fdc138",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Post request successful");
      } else {
        console.error("Post request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[600px] h-[1090px] mt-[30px]">
        <UploadImage onFileChange={handleFileChange} />

        <div className="flex items-center justify-between">
          <Author onAuthorChange={handleAuthorChange} />
          <Title onTitleChange={handleTitleChange} />
        </div>
        <Description onDescriptionChange={handleDescriptionChange} />
        <div className="flex justify-between mt-4">
          <PublishDate onPublishDateChange={handlePublishDateChange} />
          <Categories onCategoryChange={handleCategoryChange} />
        </div>
        <Email onEmailChange={handleEmailChange} />

        <div className="w-[600px] flex justify-end">
          <Image
            className={`mt-7 cursor-pointer h-[45px] ${
              isFormValid ? "" : "opacity-20"
            }`}
            src={publish}
            alt="publish button"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
