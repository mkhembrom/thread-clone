import { IPost, IUser } from "@/app/types";
import { Button } from "../ui/button";
import CustomComment from "../customComment/customComment";
import MessageIcon from "../ui/icons/message";
import SendIcon from "../ui/icons/send";
import PostLikeButton from "../postLikeButton/postLikeButton";
import getCurrentUser from "../currentUser/currentUser";
import PostRepostButton from "../postRepostButton/postRepostButton";

interface postButtonsProps {
  postData?: IPost;
}

export default async function PostButtons({ postData }: postButtonsProps) {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex space-x-1 items-center py-2 z-10">
      <PostLikeButton postData={postData} currentUser={currentUser} />

      <CustomComment postData={postData} currentUser={currentUser}>
        <MessageIcon />
      </CustomComment>
      <PostRepostButton postData={postData!} user={currentUser} />
      <Button variant={"ghost"} className="rounded-full" size={"icon"}>
        <SendIcon />
      </Button>
    </div>
  );
}
