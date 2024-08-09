import { getDocuments } from "@/lib/actions/room.action";
import { dateConverter } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Hello from "../../public/Vector.svg";

import dynamic from "next/dynamic";
import { DeleteModal } from "@/components/ShareModal/DeleteModal";
// Dynamically import components
const AddDocumentBtn = dynamic(() => import("@/components/ui/AddDocumentBtn"));

const Topbar = dynamic(() => import("@/components/ShareModal/Top"));

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    <main className="home-container">
      <Topbar />

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title items-center flex justify-center">
            <h3 className="font-bold lg:text-2xl md:text-lg sm:text-lg text-sm py-5 px-5 dark:text-white text-black">
              All documents
            </h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="grid-container w-full gap-6 mb-40 p-5 md:mb-4">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li
                key={id}
                className="relative dark:bg-gray-800 bg-gray-50 dark:text-white text-black  rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-col items-center p-6 space-y-4"
                >
                  <div className="flex justify-center items-center w-16 h-16 mb-4 dark:bg-gray-700 bg-gray-200  rounded-lg">
                    <Image src={Hello} alt="file" width={32} height={32} />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-lg font-semibold dark:text-white text-black truncate">
                      {metadata.title}
                    </p>
                    <p className="text-sm font-light text-gray-500">
                      Created {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-3 right-3">
                  <DeleteModal roomId={id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <div className="document-list-title items-center flex justify-center px-4">
            <h3 className="font-bold lg:text-2xl md:text-lg sm:text-lg text-sm py-5 px-5 dark:text-white text-black">
              All documents
            </h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <div className="flex justify-center h-[100%] my-auto items-center mx-auto flex-col">
            <Image
              src="https://i.ibb.co/rdsNfyf/duplicate-concept-illustration-114360-4010-removebg-preview.png"
              alt="Document"
              width={340}
              height={340}
              className="mx-auto"
            />

            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
