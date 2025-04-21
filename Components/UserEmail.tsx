import { useUser } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import { Suspense } from "react";
import SignoutButton from "./SignoutButton";

export default function UserEmail() {
  const { user } = useUser();

  return (
    <div>
      <div className="flex items-center justify-start p-2">
        <UserIcon size={20} className="text-gray-500 mr-2" />
        <Suspense fallback={<h1>Loading...</h1>}>
          <span className="hidden md:inline">
            {user?.emailAddresses[0].emailAddress}
          </span>
        </Suspense>
      </div>
      <SignoutButton />
    </div>
  );
}
