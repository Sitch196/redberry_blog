import BlogCategories from "@/components/BlogCategories";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Success from "@/components/Success";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <BlogCategories />
      <Success Text="წარმატებული ავტორიზაცია" buttonText="კარგი" />
    </div>
  );
}
