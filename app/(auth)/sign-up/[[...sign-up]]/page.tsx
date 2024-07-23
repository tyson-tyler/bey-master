import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-black text-white ocean">
      <SignUp />
    </div>
  );
}
