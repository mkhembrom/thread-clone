"use client";

import { ILike, IPost, IUser } from "@/app/types";
import { Button } from "../ui/button";
import { useEffect, experimental_useOptimistic, useState } from "react";
import HeartLikeIcon from "../ui/icons/heartLike";
import HeartIcon from "../ui/icons/heart";
import { useRouter } from "next/navigation";
import { handleLikePost } from "@/actions/action";
import { Like } from "@prisma/client";

interface postLikeButtonProps {
  postData?: IPost;
  currentUser?: IUser | any;
}
export default function PostLikeButton({
  postData,
  currentUser,
}: postLikeButtonProps) {
  const [mount, setMount] = useState(false);

  let isLiked;
  const [liked, setLiked] = useState<boolean | undefined>(isLiked);
  const route = useRouter();
  const handleLike = async (postId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/like/${postId}`,
      {
        method: "POST",
        cache: "no-cache",
      }
    );

    if (res.ok) {
      setLiked(true);
      route.refresh();
    } else {
      throw new Error("Failed to fetch data");
    }
  };

  // const predicate = (like: Like) =>
  //   like.userId === currentUser?.id && like.postId === postData?.id;

  // const likes = postData?.likes!;
  // const [optimisticLikes, addOptimisticLikes] = experimental_useOptimistic<
  //   Like[]
  // >(
  //   postData?.likes,
  //   //@ts-ignore
  //   (state: Like[], newLike: Like) =>
  //     state.some(predicate)
  //       ? state.filter((like) => like.userId !== (currentUser?.id as string))
  //       : [...state, newLike]
  // );
  isLiked = postData?.likes?.some((item) => item?.userId === currentUser?.id);

  useEffect(() => {
    setMount(true);
  }, [mount]);

  if (!mount) return null;

  return (
    <Button
      variant={"ghost"}
      className="rounded-full"
      size={"icon"}
      onClick={() =>
        // const postId = postData?.id;
        // const userId = currentUser.id;
        // addOptimisticLikes({ postId });
        handleLike(postData?.id as string)
      }
    >
      {isLiked ? <HeartLikeIcon /> : <HeartIcon />}
    </Button>
  );
}
