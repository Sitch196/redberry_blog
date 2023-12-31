import { ReactNode } from "react";

export interface CategoryProps {
  onCategoryChange: (value: Category[]) => void;
}

export interface BlogCardProps {
  map: (blog: any) => ReactNode;
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: Category[];
  email: string;
  currentCategory: string | undefined;

}

export interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
  
}

export interface AuthorProps {
  onAuthorChange: (data: { author: string }) => void;
}

export interface DescriptionProps {
  onDescriptionChange: (description: string) => void;
}

export interface EmailProps {
  onEmailChange: (value: string, isValid: boolean) => void;
}

export interface PublishDateProps {
  onPublishDateChange: (value: string) => void;
}

export interface TitleProps {
  onTitleChange: (data: { title: string }) => void;
}

export interface UploadImageProps {
  onFileChange: (file: File | null) => void;
}

export interface ModalProps {
  onClose: () => void;
}

export interface textTypes {
  Text: string;
  buttonText: string;
  onClose: () => void;
}

export interface AuthContextProps {
  loggedin: boolean;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface BlogDetailsProps {
  params: {
    id: string;
    
  };
}
