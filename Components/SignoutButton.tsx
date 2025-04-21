import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function SignoutButton() {
  const router = useRouter();
  const { signOut } = useClerk();
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    try {
      setIsPending(true);

      await signOut();
      router.push("/signin");
    } catch {
      toast.error("Failed to log out try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      className="flex items-center w-full px-2 py-2 text-sm  text-gray-300  hover:bg-gray-800 rounded-md hover:cursor-pointer disabled:cursor-not-allowed "
      disabled={isPending}
      onClick={handleClick}
    >
      <LogOutIcon size={20} className="mr-2" />
      <span className="hidden md:inline">
        {isPending ? "Signing out..." : "Sign Out"}
      </span>
    </button>
  );
}
