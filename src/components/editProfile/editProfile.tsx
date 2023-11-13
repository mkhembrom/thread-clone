"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import getCurrentUser from "../currentUser/currentUser";
import { useEffect, useState } from "react";
import prisma from "@/lib/prismadb";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";

interface editProfileProps {
  isOpenHere: boolean;
  setIsOpenHere: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfile({
  isOpenHere,
  setIsOpenHere,
}: editProfileProps) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const { user } = useCurrentUserForClient();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/`, {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user: profile, social: socials }) => {
        setUsername(profile?.username);
        setBio(profile?.bio);
        setUrl(socials?.url);
        setInstagram(socials?.instagram);
        setTwitter(socials?.twitter);
      });
  }, []);

  const router = useRouter();

  const handleSubmit = async () => {
    // fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${currentUser.id}`, {
    //   method: "POST",
    //   body: JSON.stringify({ username, bio, url, instagram, twitter }),
    // }).then((data) => {
    //   setIsOpenHere(false);
    //   router.refresh();
    //   router.push("/");
    // });

    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user?.id}`, {
          method: "POST",
          body: JSON.stringify({ username, bio, url, instagram, twitter }),
        }),
        {
          loading: "Loading...",
          success: "Profile updated",
          error: (error) => `Error: ${error}`,
        },
        {
          style: {
            borderRadius: "8px",
            padding: "12px",
            width: "250px",
            backgroundColor: "black",
            color: "white",
          },
        }
      )
      .then((data) => {
        setIsOpenHere(false);
        router.refresh();
      });
  };

  return (
    <Dialog open={isOpenHere} onOpenChange={setIsOpenHere}>
      <DialogTrigger>
        {/* <Button variant={"dropicon"} size={"dropicon"} className={``}> */}
        Edit Profile
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[576px] dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 z-50">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 bg-zinc-300 text-black border border-zinc-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={`${bio}`}
              onChange={(e) => setBio(e.target.value)}
              className="col-span-3 bg-zinc-300 text-black border border-zinc-300"
              placeholder="Type your message here."
            ></Textarea>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              Url
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-3 bg-zinc-300 text-black border border-zinc-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instagram" className="text-right">
              Instagram
            </Label>
            <Input
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="col-span-3 bg-zinc-300 text-black border border-zinc-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="twitter" className="text-right">
              Twitter
            </Label>
            <Input
              id="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="col-span-3 bg-zinc-300 text-black border border-zinc-300"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
