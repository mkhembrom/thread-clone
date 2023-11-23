import React from "react";
import { Button } from "../ui/button";
import CustomPostCreationDialoge from "../customDialoge/customPostCreationDialoge";
import AvatarCn from "../avatar/avatar";
import getCurrentUser from "../currentUser/currentUser";

type Props = {};

export default async function PostCreation({}: Props) {
  const session = await getCurrentUser();
  return (
    <div className={`flex items-center border-b border-zinc-800`}>
      <AvatarCn source={session?.image!} />

      <CustomPostCreationDialoge currentUser={session} />

      <Button
        variant={"outline"}
        className={`bg-zinc-300 dark:bg-zinc-600 rounded-lg cursor-not-allowed`}
      >
        Post
      </Button>
    </div>
  );
}
