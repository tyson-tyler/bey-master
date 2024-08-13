// Updated Notifications component
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
import { useRouter } from "next/navigation";

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      popoverRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPopoverVisible(window.innerWidth >= 768); // 768px for md screens
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (notificationUrl: string) => {
    if (isPopoverVisible) {
      // If the popover is visible, do nothing (default behavior)
    } else {
      // If the popover is not visible, redirect to the notification URL
      router.push(notificationUrl);
    }
  };

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-110"
        onClick={() =>
          !isPopoverVisible && router.push("/dashboard/notifications")
        }
      >
        <BsFillBellFill className="dark:text-white text-black w-6 h-6" />
        {count > 0 && (
          <div className="absolute top-0 right-0 translate-x-1 translate-y-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500">
            <div className="absolute h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></div>
            <div className="absolute h-full w-full rounded-full bg-red-500 opacity-100"></div>
          </div>
        )}
      </PopoverTrigger>
      {isPopoverVisible && (
        <PopoverContent
          ref={popoverRef}
          align="end"
          className="w-[360px] flex-wrap font-bold md:w-[460px] border-gray-900 bg-white dark:bg-gray-800 p-4 text-sm shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform origin-top-right"
        >
          <LiveblocksUIConfig>
            <InboxNotificationList>
              {unreadNotifications.length <= 0 && (
                <div className="flex flex-col gap-3 justify-center">
                  <Image
                    src="https://i.ibb.co/FVcPnxf/download-2.png"
                    width={270}
                    height={150}
                    alt="No notifications"
                    className="justify-center flex items-center mx-auto w-16 h-16 md:h-[10rem] md:w-20 object-cover"
                  />
                  <p className="py-2 text-center text-gray-700 dark:text-gray-300">
                    No new notifications
                  </p>
                </div>
              )}
              {unreadNotifications.length > 0 &&
                unreadNotifications.map((notification) => (
                  <InboxNotification
                    key={notification.id}
                    inboxNotification={notification}
                    className="bg-gray-100 w-full border-none dark:text-white dark:bg-gray-900 text-black rounded-lg p-3 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
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
                          title={
                            props.inboxNotification.activities[0].data.title
                          }
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
                    onClick={() =>
                      handleClick(`/documents/${notification.roomId}`)
                    }
                  />
                ))}
            </InboxNotificationList>
          </LiveblocksUIConfig>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Notifications;
