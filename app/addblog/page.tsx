"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import UploadImage from "@/components/addblog/UploadImage";
import Author from "@/components/addblog/Author";
import Title from "@/components/addblog/Title";
import Description from "@/components/addblog/Description";
import PublishDate from "@/components/addblog/PublishDate";
import Categories from "@/components/addblog/Categories";
import Email from "@/components/addblog/Email";
import HeaderJustLogo from "@/components/HeaderJustLogo";
import Success from "@/components/Success";
import publish from "../../assets/publish.png";
import axios from "axios";
import { Category } from "@/types";

export default function CreateBlog() {
  const [image, setImage] = useState<any>(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    validateForm();
  }, [
    image,
    author,
    title,
    description,
    publish_date,
    categories,
    email,
    isEmailValid,
  ]);
  ///////////////////HANDLING STATEs COMING FROM OTHER COMPONENTS/////////////////////
  const handleFileChange = (selectedFile: File | null) => {
    setImage(selectedFile);
  };

  const handleAuthorChange = (data: { author: string }) => {
    setAuthor(data.author);
  };

  const handleTitleChange = (data: { title: string }) => {
    setTitle(data.title);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handlePublishDateChange = (value: string) => {
    setPublish_date(value);
  };

  const handleCategoryChange = (value: any) => {
    setCategories(value);
  };

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsEmailValid(isValid);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  ///////////////////////////VALIDATIONS//////////////////////////////////////
  const validateForm = () => {
    const isImageValid = !!image;
    const isAuthorValid =
      author.trim().split(/\s+/).filter(Boolean).length >= 2 ||
      /^[ა-ჰ]+$/.test(author.replace(/\s/g, ""));
    const isTitleValid = title.length >= 4;
    const isDescriptionValid = description.length >= 4;
    const isPublishDateValid = !!publish_date;
    const isCategoryValid = categories.length > 0;
    const isEmailFieldValid = !!email;

    setIsFormValid(
      isImageValid &&
        isAuthorValid &&
        isTitleValid &&
        isDescriptionValid &&
        isPublishDateValid &&
        isCategoryValid &&
        isEmailFieldValid &&
        isEmailValid
    );
  };

  ////////////////////////////////SENDING THE FORM///////////////////////////////
  const handleSubmit = async () => {
    if (!isFormValid) {
      console.error("Please fill out all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("author", author);
      formData.append("publish_date", publish_date);

      formData.append(
        "categories",
        JSON.stringify(categories.map((category: any) => category.id))
      );

      formData.append("email", email);

      const blogResponse = await axios.post(
        "https://api.blog.redberryinternship.ge/api/blogs",
        formData,
        {
          headers: {
            Authorization:
              "Bearer 25d6ddf48ea374d83e58d1977a098873c2cb3e607c024c1814662c81eace5e3d",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (blogResponse.status === 204) {
        setShowSuccess(true);
        localStorage.removeItem("title");
        localStorage.removeItem("description");
        localStorage.removeItem("author");
        localStorage.removeItem("publish_date");
        localStorage.removeItem("email");
        localStorage.removeItem("hasStartedTyping");
        localStorage.removeItem("isAuthorValid");
        localStorage.removeItem("isTitleValid");
        localStorage.removeItem("isDescriptionValid");
        localStorage.removeItem("emailIsValid");
        console.log("Post request Successfull");
      } else {
        console.error("Post request failed with status:", blogResponse.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center sticky top-0 bg-[whitesmoke] border-b-2">
        <HeaderJustLogo />
      </div>

      <div className="flex justify-center items-center bg-white">
        <div className="flex flex-col w-[600px] h-[1090px] mt-[30px]">
          <UploadImage onFileChange={handleFileChange} />

          <div className="flex items-center justify-between mt-5">
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

          {showSuccess && (
            <Success
              Text="ჩანაწერი წარმატებით დაემატა"
              buttonText="მთავარ გვერდზე დაბრუნება"
              onClose={closeSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
