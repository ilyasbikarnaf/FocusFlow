"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  async function handleSignout() {
    await signOut();
    router.push("/signin");
  }

  return (
    <>
      <div>
        <h1>Welcome Someone</h1>
        <p>Email: {user.emailAddresses[0].emailAddress}</p>
      </div>

      <button
        onClick={handleSignout}
        className="bg-red-500 p-3 rounded-xl hover:cursor-pointer"
      >
        SignOut Mate
      </button>
    </>
  );
};

export default Profile;
