import { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { notificationPath } from "../sitemap";
import { INotification } from "../components/Notification/INotification";
import { ListItemIcon } from "@mui/material";
interface NotificationBadgeProps {
  notificationData: INotification[];
}
const NotificationBadge: FC<NotificationBadgeProps> = ({
  notificationData,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const count = notificationData.length;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewAll = () => {
    handleClose();
    navigate(notificationPath(), { state: notificationData });
  };
  const notificationsLabel = (count: number) => {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  };
  if (count === 0) {
    return (
      <Link to={notificationPath()}>
        <IconButton
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6732 18.5534C21.0303 17.9802 20.4675 17.3232 19.9999 16.6C19.4894 15.6017 19.1834 14.5115 19.0999 13.3934V10.1C19.1043 8.34376 18.4672 6.64633 17.3084 5.32666C16.1495 4.007 14.5486 3.15592 12.8065 2.93335V2.07335C12.8065 1.83731 12.7128 1.61093 12.5459 1.44402C12.379 1.27712 12.1526 1.18335 11.9165 1.18335C11.6805 1.18335 11.4541 1.27712 11.2872 1.44402C11.1203 1.61093 11.0265 1.83731 11.0265 2.07335V2.94668C9.30004 3.1853 7.71852 4.04152 6.57489 5.35675C5.43126 6.67199 4.80302 8.35711 4.80654 10.1V13.3934C4.72304 14.5115 4.41705 15.6017 3.90654 16.6C3.44712 17.3216 2.89333 17.9785 2.25987 18.5534C2.18876 18.6158 2.13176 18.6927 2.09268 18.7789C2.0536 18.8651 2.03332 18.9587 2.0332 19.0534V19.96C2.0332 20.1368 2.10344 20.3064 2.22847 20.4314C2.35349 20.5564 2.52306 20.6267 2.69987 20.6267H21.2332C21.41 20.6267 21.5796 20.5564 21.7046 20.4314C21.8296 20.3064 21.8999 20.1368 21.8999 19.96V19.0534C21.8997 18.9587 21.8795 18.8651 21.8404 18.7789C21.8013 18.6927 21.7443 18.6158 21.6732 18.5534ZM3.41987 19.2934C4.04014 18.6942 4.58627 18.0227 5.04654 17.2934C5.68961 16.0877 6.06482 14.7574 6.14654 13.3934V10.1C6.1201 9.31871 6.25115 8.54007 6.5319 7.81046C6.81265 7.08086 7.23734 6.41521 7.7807 5.85315C8.32406 5.2911 8.97496 4.84413 9.69466 4.53887C10.4144 4.2336 11.1881 4.07629 11.9699 4.07629C12.7516 4.07629 13.5254 4.2336 14.2451 4.53887C14.9648 4.84413 15.6157 5.2911 16.159 5.85315C16.7024 6.41521 17.1271 7.08086 17.4078 7.81046C17.6886 8.54007 17.8196 9.31871 17.7932 10.1V13.3934C17.8749 14.7574 18.2501 16.0877 18.8932 17.2934C19.3535 18.0227 19.8996 18.6942 20.5199 19.2934H3.41987Z"
              fill="#FFA412"
            />
            <path
              d="M11.9996 22.8533C12.4195 22.8436 12.8225 22.6857 13.1373 22.4075C13.4521 22.1294 13.6583 21.7488 13.7196 21.3333H10.2129C10.2759 21.7601 10.4918 22.1496 10.8204 22.4292C11.1491 22.7088 11.5681 22.8595 11.9996 22.8533Z"
              fill="#FFA412"
            />
          </svg>
        </IconButton>
      </Link>
    );
  }
  return (
    <>
      <IconButton
        aria-label={notificationsLabel(count)}
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={count} color="primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6732 18.5534C21.0303 17.9802 20.4675 17.3232 19.9999 16.6C19.4894 15.6017 19.1834 14.5115 19.0999 13.3934V10.1C19.1043 8.34376 18.4672 6.64633 17.3084 5.32666C16.1495 4.007 14.5486 3.15592 12.8065 2.93335V2.07335C12.8065 1.83731 12.7128 1.61093 12.5459 1.44402C12.379 1.27712 12.1526 1.18335 11.9165 1.18335C11.6805 1.18335 11.4541 1.27712 11.2872 1.44402C11.1203 1.61093 11.0265 1.83731 11.0265 2.07335V2.94668C9.30004 3.1853 7.71852 4.04152 6.57489 5.35675C5.43126 6.67199 4.80302 8.35711 4.80654 10.1V13.3934C4.72304 14.5115 4.41705 15.6017 3.90654 16.6C3.44712 17.3216 2.89333 17.9785 2.25987 18.5534C2.18876 18.6158 2.13176 18.6927 2.09268 18.7789C2.0536 18.8651 2.03332 18.9587 2.0332 19.0534V19.96C2.0332 20.1368 2.10344 20.3064 2.22847 20.4314C2.35349 20.5564 2.52306 20.6267 2.69987 20.6267H21.2332C21.41 20.6267 21.5796 20.5564 21.7046 20.4314C21.8296 20.3064 21.8999 20.1368 21.8999 19.96V19.0534C21.8997 18.9587 21.8795 18.8651 21.8404 18.7789C21.8013 18.6927 21.7443 18.6158 21.6732 18.5534ZM3.41987 19.2934C4.04014 18.6942 4.58627 18.0227 5.04654 17.2934C5.68961 16.0877 6.06482 14.7574 6.14654 13.3934V10.1C6.1201 9.31871 6.25115 8.54007 6.5319 7.81046C6.81265 7.08086 7.23734 6.41521 7.7807 5.85315C8.32406 5.2911 8.97496 4.84413 9.69466 4.53887C10.4144 4.2336 11.1881 4.07629 11.9699 4.07629C12.7516 4.07629 13.5254 4.2336 14.2451 4.53887C14.9648 4.84413 15.6157 5.2911 16.159 5.85315C16.7024 6.41521 17.1271 7.08086 17.4078 7.81046C17.6886 8.54007 17.8196 9.31871 17.7932 10.1V13.3934C17.8749 14.7574 18.2501 16.0877 18.8932 17.2934C19.3535 18.0227 19.8996 18.6942 20.5199 19.2934H3.41987Z"
              fill="#FFA412"
            />
            <path
              d="M11.9996 22.8533C12.4195 22.8436 12.8225 22.6857 13.1373 22.4075C13.4521 22.1294 13.6583 21.7488 13.7196 21.3333H10.2129C10.2759 21.7601 10.4918 22.1496 10.8204 22.4292C11.1491 22.7088 11.5681 22.8595 11.9996 22.8533Z"
              fill="#FFA412"
            />
          </svg>
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {count > 0 ? (
          <div>
            {notificationData &&
              notificationData.slice(0, 4).map((ele) => {
                return (
                  <MenuItem key={ele._id} onClick={handleViewAll}>
                    <MenuItem>
                      <ListItemIcon>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.6732 18.5534C21.0303 17.9802 20.4675 17.3232 19.9999 16.6C19.4894 15.6017 19.1834 14.5115 19.0999 13.3934V10.1C19.1043 8.34376 18.4672 6.64633 17.3084 5.32666C16.1495 4.007 14.5486 3.15592 12.8065 2.93335V2.07335C12.8065 1.83731 12.7128 1.61093 12.5459 1.44402C12.379 1.27712 12.1526 1.18335 11.9165 1.18335C11.6805 1.18335 11.4541 1.27712 11.2872 1.44402C11.1203 1.61093 11.0265 1.83731 11.0265 2.07335V2.94668C9.30004 3.1853 7.71852 4.04152 6.57489 5.35675C5.43126 6.67199 4.80302 8.35711 4.80654 10.1V13.3934C4.72304 14.5115 4.41705 15.6017 3.90654 16.6C3.44712 17.3216 2.89333 17.9785 2.25987 18.5534C2.18876 18.6158 2.13176 18.6927 2.09268 18.7789C2.0536 18.8651 2.03332 18.9587 2.0332 19.0534V19.96C2.0332 20.1368 2.10344 20.3064 2.22847 20.4314C2.35349 20.5564 2.52306 20.6267 2.69987 20.6267H21.2332C21.41 20.6267 21.5796 20.5564 21.7046 20.4314C21.8296 20.3064 21.8999 20.1368 21.8999 19.96V19.0534C21.8997 18.9587 21.8795 18.8651 21.8404 18.7789C21.8013 18.6927 21.7443 18.6158 21.6732 18.5534ZM3.41987 19.2934C4.04014 18.6942 4.58627 18.0227 5.04654 17.2934C5.68961 16.0877 6.06482 14.7574 6.14654 13.3934V10.1C6.1201 9.31871 6.25115 8.54007 6.5319 7.81046C6.81265 7.08086 7.23734 6.41521 7.7807 5.85315C8.32406 5.2911 8.97496 4.84413 9.69466 4.53887C10.4144 4.2336 11.1881 4.07629 11.9699 4.07629C12.7516 4.07629 13.5254 4.2336 14.2451 4.53887C14.9648 4.84413 15.6157 5.2911 16.159 5.85315C16.7024 6.41521 17.1271 7.08086 17.4078 7.81046C17.6886 8.54007 17.8196 9.31871 17.7932 10.1V13.3934C17.8749 14.7574 18.2501 16.0877 18.8932 17.2934C19.3535 18.0227 19.8996 18.6942 20.5199 19.2934H3.41987Z"
                            fill="#FFA412"
                          />
                          <path
                            d="M11.9996 22.8533C12.4195 22.8436 12.8225 22.6857 13.1373 22.4075C13.4521 22.1294 13.6583 21.7488 13.7196 21.3333H10.2129C10.2759 21.7601 10.4918 22.1496 10.8204 22.4292C11.1491 22.7088 11.5681 22.8595 11.9996 22.8533Z"
                            fill="#FFA412"
                          />
                        </svg>
                      </ListItemIcon>
                      <Typography variant="inherit">{ele.title}</Typography>
                    </MenuItem>
                    {}
                  </MenuItem>
                );
              })}
            {count > 4 && (
              <MenuItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleViewAll}
              >
                {" "}
                <Typography variant="body2" color="textSecondary">
                  View All
                </Typography>
              </MenuItem>
            )}
          </div>
        ) : (
          <MenuItem disabled>No notifications</MenuItem>
        )}
      </Menu>
    </>
  );
};
export default NotificationBadge;
