import Image from "next/image";
import checkmark from "../assets/checkmark.png";
import close from "../assets/close.png";
interface textTypes {
  Text: string;
  buttonText: string;
}
export default function Success({ Text, buttonText }: textTypes) {
  return (
    <div className="flex flex-col gap-8 relative justify-center items-center w-[480px] h-[300px] rounded-md ">
      <Image
        src={close}
        width={28}
        height={28}
        className="absolute top-5 right-5 cursor-pointer"
        alt="close button"
      />
      <Image src={checkmark} width={64} alt="checkmark" />
      <p className="text-lg font-bold">{Text}</p>
      <button className="w-[432px] bg-[#4c29d8] rounded-md p-2 text-white font-bold">
        {buttonText}
      </button>
    </div>
  );
}
