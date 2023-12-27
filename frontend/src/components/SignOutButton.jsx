import { useAuth } from "@clerk/clerk-react";

export default function SignoutButton() {
  const { signOut } = useAuth();
  return (
    <button
      onClick={signOut}
      className=" w-max bg-red-500 text-white font-bold rounded px-4 py-2 uppercase text-xs"
    >
      Sign Out
    </button>
  );
}
