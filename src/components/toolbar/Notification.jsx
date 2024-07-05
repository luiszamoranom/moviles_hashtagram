import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Badge } from "@mui/material";

const CustomNotification = ({ notifications = 0, openNotifications }) => {
  return (
    <Badge badgeContent={notifications} color="primary" >
      <NotificationsRoundedIcon 
        color="primary" 
        fontSize="medium"
        onClick={() => openNotifications(true)}
      />
    </Badge>
  );
};

export default CustomNotification;
