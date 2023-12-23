import CustomLink from "../customLink/customLink";
import HomeIcon from "../ui/icons/home";
import SearchIcon from "../ui/icons/search";
import CustomPostCreationDialoge from "../customDialoge/customPostCreationDialoge";
import CreateIcon from "../ui/icons/create";
import HeartIconOne from "../ui/icons/heartOne";
import ProfileIcon from "../ui/icons/profile";
import getCurrentUser from "../currentUser/currentUser";
import { IImage } from "@/app/types";

interface footerProps {
  username: string;
  image: string;
}

export default async function Footer({}: footerProps) {
  const session = await getCurrentUser();
  return (
    <div
      className={`fixed bottom-0 left-0 right-0  backdrop-blur-lg dark:bg-[#101010]/30 flex z-30`}
    >
      <nav className="md:hidden  flex w-full mx-auto justify-center ">
        <ul className="flex items-center w-full mx-auto md:justify-center justify-between px-4 md:px-0">
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
          <CustomLink linkName={`/${session?.username}`}>
            <ProfileIcon />
          </CustomLink>
        </ul>
      </nav>
    </div>
  );
}
