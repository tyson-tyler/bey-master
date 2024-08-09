"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsFillBellFill } from "react-icons/bs";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { ReactNode } from "react";

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110">
        <BsFillBellFill className="dark:text-white text-black w-5 h-5" />
        {count > 0 && (
          <div className="absolute right-1 border-none top-1 z-20 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
            <div className="absolute h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></div>
            <div className="absolute h-full w-full rounded-full bg-red-500 opacity-100 animate-fadeOut"></div>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[460px] border-gray-900 bg-white dark:bg-gray-900 p-4 shadow-lg transition-all duration-300 ease-in-out transform origin-top-right"
      >
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-gray-700 dark:text-gray-300">
                No new notifications
              </p>
            )}

            {unreadNotifications.length > 0 &&
              unreadNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className=" bg-gray-100 w-full border-none dark:text-white dark:bg-gray-900 text-black rounded-lg p-3 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                  href={`/documents/${notification.roomId}`}
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
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
