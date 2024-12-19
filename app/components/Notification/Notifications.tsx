import { Snackbar } from "@mui/material";
import { NotificationProps } from "./Notification";

export default function Notifications(props: NotificationsProps) {
  return <Snackbar>{}</Snackbar>;
}
type NotificationsProps = {
  notifications: NotificationProps[];
  show: boolean;
};
