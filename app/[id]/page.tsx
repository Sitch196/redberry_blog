"use client";
import Link from "next/link";
import LoadingSpinner from "../../LoadingSpinner";
import React, { useEffect, useState } from "react";
import exitArrow from "../../assets/exitArrow.png";
import Image from "next/image";
import HeaderJustLogo from "@/components/HeaderJustLogo";
interface Category {
  title: string;
  text_color?: string;
  background_color?: string;
}
interface BlogDetailsProps {
  params: {
    id: string;
  };
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

const BlogPage: React.FC<BlogDetailsProps> = ({ params }) => {
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://api.blog.redberryinternship.ge/api/blogs/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer 5f4f8ea35e48816ce488d1061017c83931743eac88ffbbd65f9a6fc878fdc138",
            },
          }
        );
        const data = await res.json();
        setBlogDetails(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.log(err);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

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
    <div className="flex flex-col bg-white">
      <div className="flex justify-center items-center border-b-2">
        <HeaderJustLogo />
      </div>

      {isLoading || blogDetails === null ? (
        <LoadingSpinner />
      ) : (
        <div key={blogDetails?.id} className="w-[720px] mx-auto mt-8  ">
          <Link href="/">
            <Image
              src={exitArrow}
              width={44}
              height={44}
              alt="exit"
              className="absolute top-[200px] left-[250px]  "
            />
          </Link>
          <div className="p-4">
            <img
              className="w-[720px] h-[328px] object-cover rounded-lg"
              src={blogDetails?.image}
              alt={blogDetails?.title}
            />
            <p className="text-gray-700 text-base mt-[40px] text-[16px] font-bold">
              {blogDetails?.author}
            </p>
            <p className="text-gray-600  mt-[10px] text-xs">
              {blogDetails?.publish_date}
            </p>
            <h1 className="text-3xl font-bold mt-[24px] text-[32px]">
              {blogDetails?.title}
            </h1>
            <p className="text-gray-700 text-sm mt-[24px]">
              {blogDetails?.categories.map((category, index) => (
                <span
                  key={index}
                  className={`${colorCombos[index % colorCombos.length].text} ${
                    colorCombos[index % colorCombos.length].bg
                  } inline-block rounded-full px-3 py-1 mr-2`}
                >
                  {category.title}
                </span>
              ))}
            </p>
            <p className="text-gray-600 font-medium text-[16px] mt-[40px]">
              {blogDetails?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
