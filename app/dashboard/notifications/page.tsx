// pages/notifications.tsx
"use client";
import { useEffect, useState } from "react";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";

const NotificationsPage = () => {
  const { inboxNotifications } = useInboxNotifications();
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Here you can filter notifications or handle the data as needed
    setNotifications(inboxNotifications);
  }, [inboxNotifications]);

  const handleNotificationClick = (notificationUrl: string) => {
    router.push(notificationUrl);
  };

  return (
    <>
      <Topbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <LiveblocksUIConfig>
          <InboxNotificationList>
            {notifications.length <= 0 && (
              <div className="flex flex-col gap-3 justify-center  items-center">
                <Image
                  src="https://i.ibb.co/FVcPnxf/download-2.png"
                  width={270}
                  height={150}
                  alt="No notifications"
                  className="justify-center flex  items-center mx-auto w-[12rem] h-[21rem] md:h-[10rem] md:w-20 object-cover"
                />
                <p className="py-2 text-center text-gray-700 dark:text-gray-300">
                  No new notifications
                </p>
              </div>
            )}
            {notifications.length > 0 &&
              notifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-gray-100 w-full border-none dark:text-white dark:bg-gray-900 text-black rounded-lg p-3 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                  onClick={() =>
                    handleNotificationClick(`/documents/${notification.roomId}`)
                  }
                  showActions={false}
                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={false}
                        showRoomName={false}
                      />
                    ),
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    $documentAccess: (props) => (
                      <InboxNotification.Custom
                        {...props}
                        title={props.inboxNotification.activities[0].data.title}
                        aside={
                          <InboxNotification.Icon className="bg-transparent">
                            <div className="flex items-center flex-col">
                              <Image
                                src={
                                  (props.inboxNotification.activities[0].data
                                    .avatar as string) || ""
                                }
                                width={36}
                                height={36}
                                alt="avatar"
                                className="rounded-full"
                              />
                            </div>
                          </InboxNotification.Icon>
                        }
                      >
                        {props.children}
                      </InboxNotification.Custom>
                    ),
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </div>
    </>
  );
};

export default NotificationsPage;
