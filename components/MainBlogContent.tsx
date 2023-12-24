"use client";
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://api.blog.redberryinternship.ge/api/blogs",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer 5f4f8ea35e48816ce488d1061017c83931743eac88ffbbd65f9a6fc878fdc138",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-[120px]">
      {blogs.map((blog) => (
        <div key={blog.id} className=" w-[408px] ">
          <img
            className="object-cover w-[408px] h-[328px] rounded-lg"
            src={blog.image}
            alt={blog.title}
          />
          <p className="text-[16px] font-bold mt-[20px]"> {blog.author}</p>
          <p className="text-gray-600 mt-[10px] text-xs">{blog.publish_date}</p>
          <div className="font-bold text-[20px] mt-[20px]">{blog.title}</div>
          <p className="font-medium text-gray-600 mt-[10px] ">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className={`${colorCombos[index % colorCombos.length].text} ${
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
        </div>
      ))}
    </div>
  );
};

export default MainBlogContent;
