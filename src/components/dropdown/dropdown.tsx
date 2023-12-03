"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "@/lib/themeSwitcher";
import { signOut } from "next-auth/react";
import EditProfile from "../editProfile/editProfile";

interface dropdownMenuCheckboxesProps {}

export function DropdownMenuCheckboxes({}: dropdownMenuCheckboxesProps) {
  const handleSignOut = async () => {
    await signOut();
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenHere, setIsOpenHere] = React.useState(false);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  return (
    <>
      {isClient && (
        <div
          className={`rounded-full p-2  transition-all duration-100 cursor-pointer`}
        >
          <DropdownMenu
            open={isOpen}
            onOpenChange={setIsOpen}
            modal={isOpen ? false : true}
          >
            <DropdownMenuTrigger asChild>
              <svg
                aria-label="More"
                className="x1lliihq x1n2onr6"
                color={``}
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>More</title>
                <rect
                  fill="currentColor"
                  height="2.5"
                  rx="1.25"
                  width="21"
                  x="3"
                  y="7"
                ></rect>
                <rect
                  fill="currentColor"
                  height="2.5"
                  rx="1.25"
                  width="14"
                  x="10"
                  y="15"
                ></rect>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`dark:bg-zinc-900 rounded-xl`}>
              <DropdownMenuLabel className="cursor-pointer p-2">
                <ThemeSwitcher />
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={` bottom-1`} />
              <DropdownMenuLabel className="cursor-pointer p-2">
                <Button
                  variant={"dropicon"}
                  size={"dropicon"}
                  className={``}
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
