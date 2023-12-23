import { ChangeEvent, useState, useEffect } from "react";

interface CategoryProps {
  onCategoryChange: (value: Category[]) => void;
}

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

export default function Categories({ onCategoryChange }: CategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.blog.redberryinternship.ge/api/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.title === value
    );

    if (selectedCategory) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        selectedCategory,
      ]);
      onCategoryChange([...selectedCategories, selectedCategory]);
      setCurrentSelection("");
      // Other code...
    }
  };

  const handleRemoveCategory = (category: Category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter(
        (selectedCategory) => selectedCategory !== category
      );
      onCategoryChange(updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <div className="flex flex-col gap-2 border 2 w-[288px] flex-wrap">
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl text-xs p-[7px]"
            style={{
              backgroundColor: category.background_color,
              color: category.text_color,
            }}
          >
            {category.title}
            <button
              onClick={() => handleRemoveCategory(category)}
              className="ml-2 font-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold">კატეგორია</label>
        <select
          value={currentSelection}
          onChange={handleCategoryChange}
          className="w-72 h-12 border indent-3 border-gray-300 rounded"
        >
          <option value="">აირჩიე კატეგორია</option>
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
