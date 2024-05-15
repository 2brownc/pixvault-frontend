import Notifier from "./Notifier";
import { Box, Stack } from "@mantine/core";
import { useAppSelector } from "../../app/hooks";
import {
  updateUser,
  accountLoading,
  favoritesLoading,
  historyLoading,
  historyAction,
  favoritesAction,
  accountAction,
} from "../../features/user/userSlice";

import styles from "./NotificationCenter.module.css";

export default function NotificationCenter() {
  const isAccountLoading = useAppSelector(accountLoading);
  const isFavoriteLoading = useAppSelector(favoritesLoading);
  const isHistoryLoading = useAppSelector(historyLoading);
  const historyStatus = useAppSelector(historyAction);
  const favoritesStatus = useAppSelector(favoritesAction);
  const accountStatus = useAppSelector(accountAction);
  return (
    <Stack
      gap="sm"
      className={styles.notificationContainer}
      m="0"
      p="0"
      align="flex-end"
      justify="flex-end"
    >
      <Notifier isLoading={isAccountLoading} notificationText={accountStatus} />
      <Notifier
        isLoading={isFavoriteLoading}
        notificationText={favoritesStatus}
      />
    </Stack>
  );
}
