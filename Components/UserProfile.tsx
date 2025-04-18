"use client";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Welcome Someone</h1>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default Profile;
