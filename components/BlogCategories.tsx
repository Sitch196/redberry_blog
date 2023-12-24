"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

const BlogCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.blog.redberryinternship.ge/api/categories",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer 5f4f8ea35e48816ce488d1061017c83931743eac88ffbbd65f9a6fc878fdc138",
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

  return (
    <div className="flex justify-center">
      <div className="flex overflow-x-auto w-[900px]">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`m-2  border rounded-xl cursor-pointer flex justify-center items-center`}
            style={{
              backgroundColor: category.background_color,
              color: category.text_color,
              minWidth: "150px",
            }}
          >
            <h3 className="text-xs font-bold wor">{category.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
