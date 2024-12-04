"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, SignedOut, SignOutButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);

  return (
    <main>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button onClick={() =>
      createFile({
        name: "Hello World",
      })}>Click me</Button>
    </main>
  );
}
