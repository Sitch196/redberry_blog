import BlogCategories from "@/components/BlogCategories";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MainBlogContent from "@/components/MainBlogContent";
import Success from "@/components/Success";
import React from "react";
export default function page() {
  return (
    <div>
      <Header />
      <Hero />
      <BlogCategories />
      <MainBlogContent />
    </div>
  );
}
