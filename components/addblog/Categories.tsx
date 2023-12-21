import { ChangeEvent, useState } from "react";
interface CategoryProps {
  onCategoryChange: (value: string) => void;
}
export default function Categories({ onCategoryChange }: CategoryProps) {
  const [categories, setCategories] = useState("");

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategories(value);
    onCategoryChange(value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">კატეგორია</label>
      <select
        value={categories}
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
  );
}
