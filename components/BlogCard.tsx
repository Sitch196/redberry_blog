"use client";
import { Category } from "@/types";
import { BlogCardProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slidingArrows from "../assets/slidingArrows.png";
import Link from "next/link";
import arrow from "../assets/Arrow.png";

const BlogCard = ({ currentCategory }: BlogCardProps) => {
  const [allBlogs, setAllBlogs] = useState<BlogCardProps[]>([]);
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.categories.some((category) => category.title === currentCategory)
  );

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

        setAllBlogs(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const disablePrevArrow = currentSlide === 0;
  const disableNextArrow = currentSlide === allBlogs.length - 1;

  return (
    <motion.div
      className="flex justify-center items-center flex-col mt-7 "
      initial="hidden"
      animate="visible"
    >
      <div className="w-[1288px] flex justify-between  ">
        <p className="font-bold text-[32px]">მსგავსი სტატიები</p>
        <div className="flex gap-4  ">
          <motion.div
            onClick={() => !disablePrevArrow && slider?.slickPrev()}
            className={`cursor-pointer  ${disablePrevArrow ? "disabled" : ""}`}
            initial={{ opacity: disablePrevArrow ? 0.5 : 1 }}
            animate={{ opacity: disablePrevArrow ? 0.5 : 1 }}
            whileHover={{ scale: disablePrevArrow ? 1 : 1.1 }}
          >
            <Image
              width={44}
              height={44}
              alt="sliders"
              src={slidingArrows}
              className="rotate-180"
            />
          </motion.div>
          <motion.div
            onClick={() => !disableNextArrow && slider?.slickNext()}
            className={`cursor-pointer   ${disableNextArrow ? "disabled" : ""}`}
            initial={{ opacity: disableNextArrow ? 0.5 : 1 }}
            animate={{ opacity: disableNextArrow ? 0.5 : 1 }}
            whileHover={{ scale: disableNextArrow ? 1 : 1.1 }}
          >
            <Image width={44} height={44} alt="sliders" src={slidingArrows} />
          </motion.div>
        </div>
      </div>
      <Slider
        ref={(slider) => setSlider(slider)}
        className="w-[1288px] overflow-hidden flex gap-6 bg-[whitesmoke] m-4"
        dots={false}
        infinite={false}
        speed={300}
        slidesToShow={3}
        slidesToScroll={1}
        centerMode={false}
        focusOnSelect={false}
        beforeChange={handleBeforeChange}
      >
        {filteredBlogs.map((blog: any) => (
          <motion.div
            key={blog.id}
            className="w-[408px] p-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
            <div className="font-bold text-[20px] mt-[20px]">{blog.title}</div>
            <p className="font-medium text-gray-600 mt-[10px] ">
              {blog.categories.map((category: Category, index: number) => (
                <span
                  key={index}
                  className={`text-sm inline-block rounded-full px-3 py-1 mr-2 mt-1`}
                  style={{
                    backgroundColor: category.background_color,
                    color: category.text_color,
                  }}
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
      </Slider>
    </motion.div>
  );
};

export default BlogCard;
