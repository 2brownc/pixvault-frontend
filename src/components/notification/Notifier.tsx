import { Box, Notification } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconCheck } from "@tabler/icons-react";

interface NotifierProps {
  isLoading: boolean | undefined;
  notificationText: string | null | undefined;
}

export default function Notifier({
  isLoading,
  notificationText,
}: NotifierProps) {
  // This code sets up a notification timer and shows/hides a notification based on the isLoading state
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationTimer, setNotificationTimer] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (notificationTimer > 0) {
        setNotificationTimer((seconds) => seconds - 1);
      }
    }, 1000);

    if (notificationTimer === 0) {
      setShowNotification(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [notificationTimer]);

  useEffect(() => {
    if (isLoading) {
      setNotificationTimer(5);
      setShowNotification(true);
    }
  }, [isLoading]);

  return (
    <>
      {showNotification && (
        <Box>
          <Notification icon={<IconCheck />} withCloseButton={false} withBorder>
            {notificationText}
          </Notification>
        </Box>
      )}
    </>
  );
}
