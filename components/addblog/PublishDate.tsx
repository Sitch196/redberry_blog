"use client ";

import { ChangeEvent, useState } from "react";

interface PublishDateProps {
  onPublishDateChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function PublishDate({
  onPublishDateChange,
  onCategoryChange,
}: PublishDateProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("airchi");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedDate(value);
    onPublishDateChange(value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };
  return (
    <div className="flex justify-between mt-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold">გამოქვეყნების თარიღი *</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="h-[45px] indent-3 border-2 border-gray-200 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold">კატეგორია</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-72 h-12 bg-gray-200 border indent-3 border-gray-300 rounded"
        >
          <option>აირჩიე კატეგორია</option>
          <option>მარკეტი</option>
          <option>აპლიკაცია</option>
          <option>ხელოვნური ინტელექტი</option>
          <option>UI/UX</option>
          <option>კვლევა</option>
          <option>Figma</option>
          <option>დამზადება</option>
          <option>კოპიუტერული მეცნიერება</option>
          <option>სამუშაო გარემო</option>
          <option>მუსიკა</option>
          <option>სპორტი</option>
          <option>სამშენებლო</option>
          <option>სამედიცინო</option>
          <option>სხვა</option>
        </select>
      </div>
    </div>
  );
}
