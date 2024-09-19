import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';

import PropTypes from 'prop-types';
import { noCase } from 'change-case';

// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import { UserContext } from '../../../sections/auth/UserContext';

// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState(null);

  const [notifications, setNotifications] = useState(_notifications);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Збереження поточного користувача
  const { matchedUser } = useContext(UserContext);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    setSocket(newSocket);
  
    newSocket.onmessage = (event) => {
      const receivedMessage = event.data; // Отримайте повідомлення без використання .text()
      const parsedMessage = JSON.parse(receivedMessage);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };
    
  
    // Приклад отримання поточного користувача з локального сховища або іншого місця збереження даних
    const user = matchedUser;
    setCurrentUser(user);
  
    return () => {
      newSocket.close();
    };
  }, [matchedUser]); // Додано matchedUser у масив залежностей

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && currentUser) {
      const newMessage = {
        text: inputValue,
        sender: currentUser, // Включіть об'єкт currentUser як sender
      };
      socket.send(JSON.stringify(newMessage));
      setInputValue('');
    }
  };
  
  const totalUnRead =0;

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        height="600px"
        margin="0 auto"
        padding="16px"
        border="1px solid #ccc"
        borderRadius="8px"
        overflow="auto"
      >
        <List style={{ width: '100%' }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.sender === currentUser.firstName ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
              }}
            >
              <Typography
                variant='contained'
                color="primary"
                style={{
                  background:'#f2f2f2',
                  padding: '8px',
                  borderRadius: '8px',
                }}
              >
                {message.text}
              </Typography>
              {/* <Typography
                variant="caption"
                color="textSecondary"
                style={{
                  marginLeft: '8px',
                }}
              >
                {message.sender === currentUser.firstName ? `You (${currentUser.firstName})` : message.sender}
              </Typography> */}
            </ListItem>
          ))}
        </List>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          label="Message"
          variant="outlined"
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          style={{ width: '100%', maxWidth: '200px' }}
        >
          Send
        </Button>
      </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.node,
    type: PropTypes.string,
    title: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
