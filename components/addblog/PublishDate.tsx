import { ChangeEvent, useState, useEffect } from "react";
import { PublishDateProps } from "@/types";

export default function PublishDate({ onPublishDateChange }: PublishDateProps) {
  const [publish_date, setPublish_date] = useState("");
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPublish_date(value);
    setHasSelectedDate(true);
    onPublishDateChange(value);

    localStorage.setItem("publish_date", value);
  };

  useEffect(() => {
    if (isLoading) {
      const storedDate = localStorage.getItem("publish_date");
      if (storedDate) {
        setPublish_date(storedDate);
        setHasSelectedDate(true);
        onPublishDateChange(storedDate);
      }

      setIsLoading(false);
    }
  }, [onPublishDateChange, isLoading]);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">გამოქვეყნების თარიღი *</label>
      <input
        type="date"
        value={publish_date}
        onChange={handleDateChange}
        className={`h-[45px] indent-3 border-2 rounded-md ${
          hasSelectedDate && !publish_date
            ? "border-red-500"
            : "border-gray-200"
        }`}
      />
    </div>
  );
}
