import React, { useState,useContext } from 'react';
import {Button, Box, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import firstLesson from './pdf/lesson1.pdf';
import secondLesson from './pdf/lesson2.pdf';
import threeLesson from './pdf/lesson3.pdf';
import fourthLesson from './pdf/lesson4.pdf';
import fiveLesson from './pdf/lesson5.pdf';
import Lesson6 from './pdf/lesson6.pdf';
import Lesson7 from './pdf/lesson7.pdf';
import Lesson8 from './pdf/lesson8.pdf';
import Lesson9 from './pdf/lesson9.pdf';
import Lesson10 from './pdf/lesson10.pdf';
import Lesson11 from './pdf/lesson11.pdf';
import Lesson12 from './pdf/lesson12.pdf';
import Lesson13 from './pdf/lesson13.pdf';
import Lesson14 from './pdf/lesson14.pdf';
import Lesson15 from './pdf/lesson15.pdf';
import Lesson16 from './pdf/lesson16.pdf';
import Lesson17 from './pdf/lesson17.pdf';
import Lesson18 from './pdf/lesson18.pdf';
import { UserContext } from '../../sections/auth/UserContext';
import { getUserDataFromLocalStorage } from '../../auth/localStorageUtils';

const GeneralAnalyticsPage = () => {
  const { matchedUser } = useContext(UserContext);
  const users = getUserDataFromLocalStorage();
  const [showPdfFiles, setShowPdfFiles] = useState(matchedUser.show_1);
  const [showPdfFiles1, setShowPdfFiles1] = useState(matchedUser.show_2);
  const [showPdfFiles2, setShowPdfFiles2] = useState(matchedUser.show_3);
  const [showPdfFiles3, setShowPdfFiles3] = useState(matchedUser.show_4);
  const [showPdfFiles4, setShowPdfFiles4] = useState(matchedUser.show_5);

  const pdfFiles = [
    { name: 'Лекція 1. Поняття алгоритму', file: firstLesson, styles: { backgroundColor: '#E8E8E8', marginBottom: '10px' } },
    { name: 'Лекція 2. Побудова алгоритмів складних виразів', file: secondLesson, styles: { backgroundColor: '#DADADA', marginBottom: '10px' } },
    { name: 'Лекція 3. Циклічні алгоритми', file: threeLesson, styles: { backgroundColor: '#CCCCCC', marginBottom: '10px' } },
    { name: 'Лекція 4. Парадигма процедурного програмування', file: fourthLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } },
  ];
  const pdfFiles1 = [
    { name: "Лекція 5. Історія розвитку комп'ютерів", file: fiveLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } }
  ];
  const pdfFiles2 = [
    { name: 'Лекція 6. Системи числення', file: fourthLesson, styles: { backgroundColor: '#CCCCCC', marginBottom: '10px' } },
    { name: "Лекція 7. Подання даних у пам'яті комп'ютерів", file: fiveLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } }
  ];
  const pdfFiles3 = [
    { name: 'Лекція 8. Поняття алгоритму', file: firstLesson, styles: { backgroundColor: '#E8E8E8', marginBottom: '10px' } },
    { name: 'Лекція 9. Побудова алгоритмів складних виразів', file: secondLesson, styles: { backgroundColor: '#DADADA', marginBottom: '10px' } },
    { name: 'Лекція 10. Циклічні алгоритми', file: threeLesson, styles: { backgroundColor: '#CCCCCC', marginBottom: '10px' } },
    { name: 'Лекція 11. Парадигма процедурного програмування', file: fourthLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } },
    { name: "Лекція 12. Історія розвитку комп'ютерів", file: fiveLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } },
    { name: 'Лекція 13. Парадигма процедурного програмування', file: fourthLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } },
    { name: "Лекція 14. Історія розвитку комп'ютерів", file: fiveLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } }
  ];
  const pdfFiles4 = [
    { name: 'Лекція 15. Системи числення', file: fourthLesson, styles: { backgroundColor: '#CCCCCC', marginBottom: '10px' } },
    { name: "Лекція 16. Подання даних у пам'яті комп'ютерів", file: fiveLesson, styles: { backgroundColor: '#BFBFBF', marginBottom: '10px' } }
  ];

  const togglePdfFiles = () => {
    const updatedUsers = users.map((user) => {
      user.show_1 = !(user.show_1);
      console.log(user.show_1)
      return user;
    });
    
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    console.log(updatedUsers);
    
    setShowPdfFiles(!showPdfFiles);
  };

  const togglePdfFiles1 = () => {
    const updatedUsers = users.map((user) => {
      user.show_2 = !(user.show_2);
      console.log(user.show_2)
      return user;
    });
    
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    console.log(updatedUsers);
    
    setShowPdfFiles1(!showPdfFiles1);
  };

  const togglePdfFiles2 = () => {
    const updatedUsers = users.map((user) => {
      user.show_3 = !(user.show_3);
      console.log(user.show_3)
      return user;
    });
    
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    console.log(updatedUsers);
    
    setShowPdfFiles2(!showPdfFiles2);
  };

  const togglePdfFiles3 = () => {
    const updatedUsers = users.map((user) => {
      user.show_4 = !(user.show_4);
      console.log(user.show_4)
      return user;
    });
    
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    console.log(updatedUsers);
    
    setShowPdfFiles3(!showPdfFiles3);
  };

  const togglePdfFiles4 = () => {
    const updatedUsers = users.map((user) => {
      user.show_5 = !(user.show_5);
      console.log(user.show_5)
      return user;
    });
    
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
    console.log(updatedUsers);
    
    setShowPdfFiles4(!showPdfFiles4);
  };

  const openPdf = (file) => {
    window.open(file, '_blank');
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>Алгоритми та програмування</Typography>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Задання алгоритму</Typography>
       <Box sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
       {matchedUser.role==='admin'&&<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          {showPdfFiles ? (
            <Button onClick={togglePdfFiles} variant="contained" color="secondary">Сховати</Button>
          ) : (
            <Button onClick={togglePdfFiles} variant="contained" color="primary">Показати</Button>
          )}
        </Typography>}
        {matchedUser.show_1 &&showPdfFiles&& pdfFiles.map((pdfFile, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...pdfFile.styles }} onClick={() => openPdf(pdfFile.file)}>
            <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
            <Typography>{pdfFile.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Історія розвитку ЕОМ</Typography>
      <Box sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      {matchedUser.role==='admin'&&<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          {showPdfFiles1 ? (
            <Button onClick={togglePdfFiles1} variant="contained" color="secondary">Сховати</Button>
          ) : (
            <Button onClick={togglePdfFiles1} variant="contained" color="primary">Показати</Button>
          )}
        </Typography>}
        {matchedUser.show_2 &&showPdfFiles1&& pdfFiles1.map((pdfFile, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...pdfFile.styles }} onClick={() => openPdf(pdfFile.file)}>
            <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
            <Typography>{pdfFile.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Системи числення</Typography>
      <Box sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      {matchedUser.role==='admin'&&<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          {showPdfFiles2 ? (
            <Button onClick={togglePdfFiles2} variant="contained" color="secondary">Сховати</Button>
          ) : (
            <Button onClick={togglePdfFiles2} variant="contained" color="primary">Показати</Button>
          )}
        </Typography>}
        {matchedUser.show_3 &&showPdfFiles2&& pdfFiles2.map((pdfFile, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...pdfFile.styles }} onClick={() => openPdf(pdfFile.file)}>
            <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
            <Typography>{pdfFile.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Основи мови С</Typography>
      <Box sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        {matchedUser.role==='admin'&&<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          {showPdfFiles3 ? (
            <Button onClick={togglePdfFiles3} variant="contained" color="secondary">Сховати</Button>
          ) : (
            <Button onClick={togglePdfFiles3} variant="contained" color="primary">Показати</Button>
          )}
        </Typography>}
        {matchedUser.show_4 &&showPdfFiles3&& pdfFiles3.map((pdfFile, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...pdfFile.styles }} onClick={() => openPdf(pdfFile.file)}>
            <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
            <Typography>{pdfFile.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Подання даних у пам`яті комп`ютерів</Typography>
      <Box sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      {matchedUser.role==='admin'&&<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          {showPdfFiles4 ? (
            <Button onClick={togglePdfFiles4} variant="contained" color="secondary">Сховати</Button>
          ) : (
            <Button onClick={togglePdfFiles4} variant="contained" color="primary">Показати</Button>
          )}
        </Typography>}
        {matchedUser.show_5 &&showPdfFiles4&&pdfFiles4.map((pdfFile, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...pdfFile.styles }} onClick={() => openPdf(pdfFile.file)}>
            <PictureAsPdfIcon sx={{ marginRight: '10px' }} />
            <Typography>{pdfFile.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GeneralAnalyticsPage;
