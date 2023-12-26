import Image from "next/image";
import logo from "../assets/logo.png";

import Link from "next/link";
export default function HeaderJustLogo() {
  return (
    <div className="flex justify-between py-7 px-16 ">
      <Link href="/">
        <Image
          src={logo}
          width={150}
          height={24}
          alt="redberry logo"
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
}
