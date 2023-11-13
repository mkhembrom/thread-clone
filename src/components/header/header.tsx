import Image from "next/image";
import React from "react";
import CustomLink from "../customLink/customLink";
import HomeIcon from "../ui/icons/home";
import SearchIcon from "../ui/icons/search";
import ProfileIcon from "../ui/icons/profile";
import { DropdownMenuCheckboxes } from "../dropdown/dropdown";
import CustomPostCreationDialoge from "../customDialoge/customPostCreationDialoge";
import Link from "next/link";
import HeartIconOne from "../ui/icons/heartOne";
import getCurrentUser from "../currentUser/currentUser";
import CustomBackArrow from "../customBackArrow/customBackArrow";

type Props = {
  backArrow?: boolean;
};

export default async function Header({ backArrow }: Props) {
  const currentUser = await getCurrentUser();

  return (
    <header
      className={`
        flex 
        w-full
        lg:w-2/3
        justify-between 
        items-center 
        ${backArrow ? "px-2" : "py-2 px-2 "}
        items-center
        h-20
        mx-auto 
        sticky 
        top-0 
        left-0 
        right-0 
        backdrop-blur-lg
        dark:bg-[#101010]/30
        z-40
        `}
    >
      <Link
        href={"/"}
        className="md:hidden absolute left-1/2 -translate-x-1/2 flex justify-center items-center w-20 h-10"
      >
        <Image
          className={`hover:scale-110 transition-all duration-100 cursor-pointer dark:invert `}
          src={"/images/threads.png"}
          alt={"logo"}
          width={20}
          height={20}
          blurDataURL="data:[<mediatype>][;base64],<data>"
          priority={true}
        />
      </Link>
      <Link href={"/"} className="hidden md:flex justify-center w-10 ">
        <Image
          className={`hover:scale-110 transition-all duration-100 cursor-pointer dark:invert`}
          src={"/images/threads.png"}
          alt={"logo"}
          width={20}
          height={20}
          blurDataURL="data:[<mediatype>][;base64],<data>"
          priority={true}
        />
      </Link>

      <div className="w-screen max-w-xl flex justify-between md:px-0">
        <CustomBackArrow />

        <nav className="hidden md:flex w-full mx-auto justify-center">
          <ul className="flex items-center w-full mx-auto justify-center">
            <CustomLink linkName="/">
              <HomeIcon />
            </CustomLink>
            <CustomLink linkName="/search">
              <SearchIcon />
            </CustomLink>
            <CustomPostCreationDialoge customBtn />

            <CustomLink linkName="/notification">
              <HeartIconOne />
            </CustomLink>

            <CustomLink linkName={`/${currentUser?.username}`}>
              <ProfileIcon />
            </CustomLink>
          </ul>
        </nav>
      </div>
      <div className={`justify-end rounded-full`}>
        <DropdownMenuCheckboxes />
      </div>
    </header>
  );
}
