"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import arrow from "../assets/Arrow.png";

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: Category[];
  email: string;
}

interface blogProps {}

const MainBlogContent: React.FC<blogProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.blog.redberryinternship.ge/api/categories",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer 25d6ddf48ea374d83e58d1977a098873c2cb3e607c024c1814662c81eace5e3d",
            },
          }
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://api.blog.redberryinternship.ge/api/blogs",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer 25d6ddf48ea374d83e58d1977a098873c2cb3e607c024c1814662c81eace5e3d",
            },
          }
        );
        const data = await res.json();

        setBlogs(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  const colorCombos = [
    { text: "text-blue-800", bg: "bg-blue-300" },
    { text: "text-green-800", bg: "bg-green-300" },
    { text: "text-red-800", bg: "bg-red-300" },
    { text: "text-yellow-800", bg: "bg-yellow-300" },
    { text: "text-purple-800", bg: "bg-purple-300" },
    { text: "text-indigo-800", bg: "bg-indigo-300" },
    { text: "text-pink-800", bg: "bg-pink-300" },
    { text: "text-orange-800", bg: "bg-orange-300" },
    { text: "text-teal-800", bg: "bg-teal-300" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex overflow-x-auto w-[900px] ">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`m-2  border rounded-2xl cursor-pointer flex justify-center items-center py-2`}
              style={{
                backgroundColor: category.background_color,
                color: category.text_color,
                minWidth: "170px",
              }}
            >
              <h3 className="text-xs font-bold wor">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-[120px]"
      >
        {blogs
          .filter((blog) =>
            selectedCategory
              ? blog.categories.some((cat) => cat.id === selectedCategory)
              : true
          )
          .map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-[408px]"
            >
              <img
                className="object-cover w-[408px] h-[328px] rounded-lg"
                src={blog.image}
                alt={blog.title}
              />
              <p className="text-[16px] font-bold mt-[20px]"> {blog.author}</p>
              <p className="text-gray-600 mt-[10px] text-xs">
                {blog.publish_date}
              </p>
              <div className="font-bold text-[20px] mt-[20px]">
                {blog.title}
              </div>
              <p className="font-medium text-gray-600 mt-[10px] ">
                {blog.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`${
                      colorCombos[index % colorCombos.length].text
                    } ${
                      colorCombos[index % colorCombos.length].bg
                    } text-sm inline-block rounded-full px-3 py-1 mr-2 mt-1`}
                  >
                    {category.title}
                  </span>
                ))}
              </p>
              <p className="text-gray-700 text-[16px] mt-[20px] truncate">
                {blog.description}
              </p>
              <Link href={`/${blog.id}`}>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-bold cursor-pointer mt-[18px] text-[#5d37f3]">
                    სრულად ნახვა
                  </p>
                  <Image
                    className="mt-3"
                    src={arrow}
                    width={20}
                    height={18}
                    alt="arrow"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default MainBlogContent;
