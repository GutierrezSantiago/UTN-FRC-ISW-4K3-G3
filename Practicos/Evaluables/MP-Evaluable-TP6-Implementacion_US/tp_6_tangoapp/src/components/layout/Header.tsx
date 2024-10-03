import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import UserButton from "../UserButton";

const Header = async () => {
  return (
    <header className="fixed bottom-0 z-[50] flex h-[70px] w-full max-w-[100vw] items-center justify-between bg-[#00B4D8] px-[20px] md:h-[100px] md:px-[30px] xl:px-[50px] 2xl:px-[60px]">
      <div className="flex h-full items-center justify-between w-full">
        <Link href="/" className="flex h-full items-center">
          <img
            src={"/Header-Logo.png"}
            alt=""
            className="h-[40px] w-auto md:h-[50px] lg:h-[60px]"
          />
        </Link>

        <UserButton />
      </div>
    </header>
  );
};

export default Header;
