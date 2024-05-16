import Notifier from "./Notifier"
import { Box, Stack } from "@mantine/core"
import { useAppSelector } from "../../app/hooks"
import {
	accountLoading,
	favoritesLoading,
	allHistoryLoading,
	allHistoryAction,
	favoritesAction,
	accountAction,
} from "../../features/user/userSlice"

import styles from "./NotificationCenter.module.css"

export default function NotificationCenter() {
	const isAccountLoading = useAppSelector(accountLoading)
	const isFavoriteLoading = useAppSelector(favoritesLoading)
	const isAllHistoryLoading = useAppSelector(allHistoryLoading)
	const allHistoryStatus = useAppSelector(allHistoryAction)
	const favoritesStatus = useAppSelector(favoritesAction)
	const accountStatus = useAppSelector(accountAction)
	return (
		<Stack
			gap="sm"
			className={styles.notificationContainer}
			m="0"
			p="0"
			align="flex-end"
			justify="flex-end"
		>
			<Notifier
				isLoading={isFavoriteLoading}
				notificationText={favoritesStatus}
			/>
			<Notifier
				isLoading={isAllHistoryLoading}
				notificationText={allHistoryStatus}
			/>
			<Notifier isLoading={isAccountLoading} notificationText={accountStatus} />
		</Stack>
	)
}
