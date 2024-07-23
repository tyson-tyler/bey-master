import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row justify-center items-center bg-black lg:bg-[url('https://media1.giphy.com/media/7AtHoQ9XWbpwLRxs0t/giphy.webp?cid=790b76117jtwcep06cr96ylhwqb7o5447bquuvbsb5qjmjdf&ep=v1_gifs_search&rid=giphy.webp&ct=g')] bg-pois   bg-no-repeat text-white bg-gradient-custom relative">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://cdn.pixabay.com/photo/2017/06/25/19/31/geek-2441687_960_720.jpg')] bg-no-repeat lg:w-1/2 lg:h-full blur-md"></div>
      <div className="relative z-10 p-8  lg:w-1/2 lg:flex lg:justify-center lg:items-center">
        <SignIn />
      </div>
    </div>
  );
}
