import { IComment } from "@/app/types";
import React from "react";
import AvatarCn from "../avatar/avatar";
import PlusIcon from "../ui/icons/plus";
import CommentButtons from "../commentButtons/commentButtons";
import { Button } from "../ui/button";
import CommentDropDown from "../commentDropDown/commentDropDown";
import ThreeDotsIcon from "../ui/icons/threeDots";
import getCurrentUser from "../currentUser/currentUser";
import { formatTimeAgo } from "@/lib/timeFormat";
import PostButtons from "../postButtons/postButtons";
import ImagePreview from "../imagePreview/imagePreview";
import PostDropDown from "../postDropDown/postDropDown";
import Link from "next/link";
import ImageLightBox from "../imageLightBox/imageLightBox";

interface userRepliesProps {
  item?: IComment | any;
}
export default async function UserReplies({ item }: userRepliesProps) {
  const currentUser = await getCurrentUser();
  const time = formatTimeAgo(item.createdAt);

  return (
    <>
      {item.parentId ? (
        <>
          <div className="flex w-full flex-col mb-4 ">
            <div className={`flex flex-col justify-between items-startw-full `}>
              <div className="flex justify-between items-start w-full">
                <div className="flex space-x-4 items-start">
                  <div className="relative z-30 ">
                    <AvatarCn source={item?.parentComment.user?.image} />

                    <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
                      <PlusIcon />
                    </div>
                  </div>
                  <div className="flex flex-col items-start relative">
                    <div className="h-full w-[2px] my-4 bg-zinc-300 dark:bg-zinc-700 absolute  -left-[36px] right-0"></div>
                    <span className="font-bold ">
                      {item?.parentComment.user?.name}
                    </span>

                    <p className="text-sm pb-2">{item?.parentComment?.reply}</p>

                    {item?.parentComment.images.length > 0 ? (
                      <ImageLightBox
                        img={item?.images[0]?.imageUrl}
                        id={item?.id}
                      />
                    ) : (
                      <></>
                    )}

                    <CommentButtons
                      comment={item.parentComment}
                      currentUser={currentUser}
                    />
                    <Button
                      variant={"link"}
                      size={"link"}
                      className={`dark:text-gray-300 text-sm font-normal ml-4 mt-0 pt-0`}
                    >
                      {item?.parentComment.likes.length!} like
                    </Button>
                  </div>
                </div>

                <div className="z-30 flex items-center  space-x-2">
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {time}
                  </p>
                  <div className="flex items-center ">
                    <Button
                      asChild
                      className="hover:bg-zinc-400 dark:hover:bg-zinc-400  rounded-full "
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <CommentDropDown
                        commentId={item.parentComment.id}
                        postId={item.parentComment.postId}
                        userId={item.parentComment.userId}
                        currentUser={currentUser}
                      >
                        <ThreeDotsIcon />
                      </CommentDropDown>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col border-b mb-4 pb-4 dark:border-zinc-600 border-zinc-300 ">
            <div className={`flex flex-col justify-between items-startw-full `}>
              <div className="flex justify-between items-start w-full">
                <div className="flex space-x-4 items-start">
                  <div className="relative z-30 ">
                    <AvatarCn source={item?.user?.image} />

                    <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
                      <PlusIcon />
                    </div>
                  </div>
                  <div className="flex flex-col items-start relative">
                    {/* {nestedComments.length > 0 && (
                    <div className="h-full w-[1.5px] my-4 bg-zinc-300 dark:bg-zinc-600 absolute  -left-[36px] right-0"></div>
                  )} */}
                    <span className="font-bold ">{item?.user?.name}</span>

                    <p className="text-sm pb-2">{item?.reply}</p>

                    {item?.images.length > 0 ? (
                      <ImageLightBox
                        img={item?.images[0]?.imageUrl}
                        id={item?.id}
                      />
                    ) : (
                      <></>
                    )}

                    <CommentButtons comment={item} currentUser={currentUser} />
                    <Button
                      variant={"link"}
                      size={"link"}
                      className={`dark:text-gray-300 text-sm font-normal ml-4 mt-0 pt-0`}
                    >
                      {item?.likes.length!} like
                    </Button>
                  </div>
                </div>

                <div className="z-30 flex items-center  space-x-2">
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {time}
                  </p>
                  <div className="flex items-center ">
                    <Button
                      asChild
                      className="hover:bg-zinc-400 dark:hover:bg-zinc-400  rounded-full "
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <CommentDropDown
                        commentId={item.id}
                        postId={item.postId}
                        userId={item.user.id}
                        currentUser={currentUser}
                      >
                        <ThreeDotsIcon />
                      </CommentDropDown>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`w-full flex pb-4 mb-4cursor-pointer`}>
            <div className="flex flex-row items-start space-x-2 w-full">
              <div className="flex flex-col items-center justify-between h-full space-y-4">
                <div className="relative z-30 ">
                  <AvatarCn source={item?.post?.user?.image!} />

                  <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
                    <PlusIcon />
                  </div>
                </div>

                <div className="w-[2px] h-full max-h-full dark:bg-[#333638]  bg-zinc-300"></div>
              </div>

              <div className="flex flex-col justify-between items-start w-full relative">
                <Link
                  className="absolute top-0 left-0 right-0 bottom-0"
                  href={`/${item?.post?.user?.username}/post/${item?.post?.id}`}
                ></Link>

                <div className="flex z-30 justify-between w-full">
                  <Link
                    href={`/${item?.post?.user?.username}`}
                    className={`text-base font-bold hover:underline`}
                  >
                    {item?.post?.user?.name}
                  </Link>
                  <div className="flex space-x-2 items-center">
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm ">
                      {time}
                    </p>
                    <Button
                      asChild
                      className="hover:bg-zinc-400 dark:hover:bg-zinc-300 text-zinc-600 dark:text-zinc-200 rounded-full focus:outline-none"
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <PostDropDown postId={item?.id} />
                    </Button>
                  </div>
                </div>
                <p className={`text-sm pt-1 pb-4`}>{item?.post?.content}</p>
                <ImagePreview imageData={item?.post.image} />

                <PostButtons postData={item.post} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col border-b mb-4 pb-4 dark:border-zinc-600 border-zinc-300 ">
            <div className={`flex flex-col justify-between items-startw-full `}>
              <div className="flex justify-between items-start w-full">
                <div className="flex space-x-4 items-start">
                  <div className="relative z-30 ">
                    <AvatarCn source={item?.user?.image} />

                    <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
                      <PlusIcon />
                    </div>
                  </div>
                  <div className="flex flex-col items-start relative">
                    {/* {nestedComments.length > 0 && (
                <div className="h-full w-[1.5px] my-4 bg-zinc-300 dark:bg-zinc-600 absolute  -left-[36px] right-0"></div>
              )} */}
                    <span className="font-bold ">{item?.user?.name}</span>

                    <p className="text-sm pb-2">{item?.reply}</p>

                    {item?.images.length > 0 ? (
                      <ImageLightBox
                        img={item?.images[0]?.imageUrl}
                        id={item?.id}
                      />
                    ) : (
                      <></>
                    )}

                    <CommentButtons comment={item} currentUser={currentUser} />
                    <Button
                      variant={"link"}
                      size={"link"}
                      className={`dark:text-gray-300 text-sm font-normal ml-4 mt-0 pt-0`}
                    >
                      {item?.likes.length!} like
                    </Button>
                  </div>
                </div>

                <div className="z-30 flex items-center  space-x-2">
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {time}
                  </p>
                  <div className="flex items-center ">
                    <Button
                      asChild
                      className="hover:bg-zinc-400 dark:hover:bg-zinc-400  rounded-full "
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <CommentDropDown
                        commentId={item.id}
                        postId={item.postId}
                        userId={item.user.id}
                        currentUser={currentUser}
                      >
                        <ThreeDotsIcon />
                      </CommentDropDown>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
