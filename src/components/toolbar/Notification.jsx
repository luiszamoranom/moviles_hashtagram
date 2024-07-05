import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Badge } from "@mui/material";

const CustomNotification = ({ openNotifications, cantidad }) => {

  return (
    <Badge badgeContent={cantidad} color="primary" >
      <NotificationsRoundedIcon 
        color="primary" 
        fontSize="medium"
        onClick={() => openNotifications(true)}
      />
    </Badge>
  );
};

export default CustomNotification;
