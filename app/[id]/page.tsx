"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../../LoadingSpinner";
import exitArrow from "../../assets/exitArrow.png";
import Image from "next/image";
import HeaderJustLogo from "@/components/HeaderJustLogo";
import { BlogCardProps } from "@/types";
import { BlogDetailsProps } from "@/types";
import { colorCombos } from "@/utils/colorCombos";

const BlogPage: React.FC<BlogDetailsProps> = ({ params }) => {
  const [blogDetails, setBlogDetails] = useState<BlogCardProps | null>(null);
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
                "Bearer 25d6ddf48ea374d83e58d1977a098873c2cb3e607c024c1814662c81eace5e3d",
            },
          }
        );
        const data = await res.json();
        setBlogDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-white "
    >
      <div className="flex justify-center items-center border-b-2 ">
        <HeaderJustLogo />
      </div>

      {isLoading || blogDetails === null ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          key={blogDetails?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-[720px] mx-auto mt-8"
        >
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
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-[720px] h-[328px] object-cover rounded-lg"
              src={blogDetails?.image}
              alt={blogDetails?.title}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 text-base mt-[40px] text-[16px] font-bold"
            >
              {blogDetails?.author}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600  mt-[10px] text-xs"
            >
              {blogDetails?.publish_date} &#8226; {blogDetails?.email}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold mt-[24px] text-[32px]"
            >
              {blogDetails?.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 text-sm mt-[24px]"
            >
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
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 font-medium text-[16px] mt-[40px]"
            >
              {blogDetails?.description}
            </motion.p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogPage;
