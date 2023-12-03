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
import { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import useCurrentUserForClient from "@/lib/clientComponent";
import AvatarCn from "../avatar/avatar";
import prisma from "@/lib/prismadb";
interface editProfileProps {
  isOpenHere: boolean;
  setIsOpenHere: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfile({
  isOpenHere,
  setIsOpenHere,
}: editProfileProps) {
  const { user } = useCurrentUserForClient();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState<string>("");

  const [url, setUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [image, setImage] = useState<string | undefined>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    if (user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user?.id}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then(({ social: socials }) => {
          if (user) {
            setUsername(user?.username!);
            setBio(user?.bio!);
            setImage(user?.image!);
          }

          setUrl(socials?.url);
          setInstagram(socials?.instagram);
          setTwitter(socials?.twitter);
        });
    }
  }, [user, user?.id]);

  // useEffect(() => {
  //   const socialData = async () => {
  //     const socials = await prisma?.socials.findUnique({
  //       where: {
  //         userId: `${user?.id}`,
  //       },
  //       select: {
  //         instagram: true,
  //         url: true,
  //         twitter: true,
  //       },
  //     });

  //     console.log(socials);

  //     setUrl(socials?.url);
  //     setInstagram(socials?.instagram);
  //     setTwitter(socials?.twitter);
  //   };

  //   socialData();
  // }, [user?.id]);

  const router = useRouter();

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("url", url);
    formData.append("instagram", instagram);
    formData.append("twitter", twitter);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user?.id}`, {
          method: "POST",
          body: formData,
          cache: "no-cache",
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
        router.refresh();
        setIsOpenHere(false);
      });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    const preview: string | undefined = file
      ? URL.createObjectURL(file)
      : undefined;
    setImage(preview);
    setSelectedFile(file);
  };

  return (
    <>
      {isClient && (
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
            <form className="grid gap-4 py-4 z-50">
              <div className="grid grid-cols-4 items-center gap-4">
                <input
                  className="col-span-2 space-x-4"
                  id="imageFile"
                  accept="image/*"
                  type="file"
                  onChange={handleFile}
                />
                <div className="col-span-2 flex items-center justify-center">
                  {image ? (
                    <AvatarCn
                      id="imagechange"
                      source={image}
                      height={"20"}
                      width="20"
                    />
                  ) : (
                    <AvatarCn
                      id="imagechange"
                      source={user?.image!}
                      height={"20"}
                      width="20"
                    />
                  )}
                </div>
              </div>
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
                  value={bio || ""}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setBio(e.target.value)}
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
              <Button onClick={handleSubmit}>Save changes</Button>
            </form>
            {/* <DialogFooter>
              <Button onClick={handleSubmit}>Save changes</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
