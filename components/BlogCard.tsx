interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  author: string;
  publishDate: string;
  categories: Category[];
  email: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  author,
  publishDate,
  categories,
}) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">Author: {author}</p>
        <p className="text-gray-700 text-base">Publish Date: {publishDate}</p>
        <p className="text-gray-700 text-base">
          Categories: {categories.map((category) => category.title).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
