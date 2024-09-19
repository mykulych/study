import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { UserContext } from '../../sections/auth/UserContext';

export default function ChatInfo() {
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
  

  return (
    <>
      <Typography align="center">
        <h1>Привіт, тут ти можеш комунікувати з іншими студентами! Навчатись разом веселіше!</h1>
      </Typography>
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
              <Typography
                variant="caption"
                color="textSecondary"
                style={{
                  marginLeft: '8px',
                }}
              >
                {message.sender === currentUser.firstName ? `You (${currentUser.firstName})` : message.sender}
              </Typography>
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
    </>
  );
}
