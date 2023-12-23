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
          "https://api.blog.redberryinternship.ge/api/categories"
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
    <div>
      <div className="flex overflow-x-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`m-2 p-2 border rounded-lg flex-grow cursor-pointer text-center`}
            style={{
              backgroundColor: category.background_color,
              color: category.text_color,
              minWidth: "100px",
            }}
          >
            <h3 className="text-xs font-bold">{category.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
