import React, { useContext, useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import { UserContext } from '../../sections/auth/UserContext';
import { getUserDataFromLocalStorage } from '../../auth/localStorageUtils';

export default function BlogPostsPage() {
  
  const [questionsRandom, setQuestionsRandom] = useState([]);

  const [questions, setQuestions] = useState(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    return storedQuestions.length > 0 ? storedQuestions : [
      { 
        questionText: "Відмітьте правильну, на Вашу думку, реалізацію твердження: «Значення змінної «х» лежить в діапазоні від 1 до 9, але не дорівнює 7».", 
        answerOptions: [ 
          { answerText: 'x >= 1 && x <= 9 && x != 7', isCorrect: true }, 
          { answerText: '(x >= 1 && x <= 9 && x != 7', isCorrect: false }, 
          { answerText: 'x == 7 || (x <= 9 && x >= 1)', isCorrect: false }, 
          { answerText: '(x >= 1  x <= 9)  x != 7)', isCorrect: false }, 
          { answerText: '!(x < 1 && x > 9) && x = 7', isCorrect: false }, 
        ],
  }, 
  
  
    ];
  });
  
  const { matchedUser } = useContext(UserContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    answerOptions: [
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
    ],
    correctAnswerIndex: -1, // Index of the correct answer
  });

  const getRandomQuestions = (allQuestions, count) => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      console.log(score);
      setScore(score + 1);
      console.log(score);

    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsRandom.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const users = getUserDataFromLocalStorage();

      const updatedUsers = users.map((user) => {
        if (
          user.email === matchedUser.email &&
          user.password === matchedUser.password
        ) {
          if (!user.results) {
            user.results = []; // Ініціалізуємо results як порожній масив, якщо вона не існує
          }
          console.log(score);
          if (isCorrect){
            setScore(score+1);
            user.results.push(score+1);
          }else
          user.results.push(score);

        }
        return user;
      });
      console.log(score);
      localStorage.setItem('usersData', JSON.stringify(updatedUsers));
      console.log(updatedUsers);
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const randomQuestions = getRandomQuestions(allQuestions, 10);
    setQuestionsRandom(randomQuestions);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };
  

  const handleQuestionTextChange = (event) => {
    setNewQuestion((prevState) => ({
      ...prevState,
      questionText: event.target.value,
    }));
  };

  const handleAnswerOptionChange = (event, index) => {
    const { value } = event.target;
    setNewQuestion((prevState) => {
      const updatedAnswerOptions = prevState.answerOptions.map(
        (option, optionIndex) => {
          if (index === optionIndex) {
            return { ...option, answerText: value };
          }
          return option;
        }
      );
      return {
        ...prevState,
        answerOptions: updatedAnswerOptions,
      };
    });
  };

const handleCorrectAnswerChange = (event) => {
  const correctAnswerIndex = parseInt(event.target.value, 10); // Add radix parameter

  setNewQuestion((prevState) => {
    const updatedAnswerOptions = prevState.answerOptions.map(
      (option, optionIndex) => {
        if (optionIndex === correctAnswerIndex) {
          return { ...option, isCorrect: true };
        }
        return { ...option, isCorrect: false };
      }
    );

    return {
      ...prevState,
      correctAnswerIndex,
      answerOptions: updatedAnswerOptions,
    };
  });
};



const handleAddQuestion = () => {
  const updatedQuestions = [...questions, newQuestion];
  setQuestions(updatedQuestions);
  localStorage.setItem('questions', JSON.stringify(updatedQuestions));

  setNewQuestion({
    questionText: '',
    answerOptions: [
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
      { answerText: '', isCorrect: false },
    ],
    correctAnswerIndex: -1,
  });
};

  return matchedUser.role === 'admin' ? (
    <Box>
      {questions.map((question, index) => (
        <Box key={index} mb={4}>
          <Box
            bgcolor="lightgray"
            padding={2}
            marginBottom={2}
            width="100%"
            borderRadius={8}
          >
            <Typography variant="body1" align="left">
              {question.questionText}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            {question.answerOptions.map((answerOption, answerIndex) => (
              <Button
                key={answerIndex}
                variant={
                  answerOption.isCorrect ? 'contained' : 'outlined'
                } // Змінюємо стиль кнопки залежно від правильності відповіді
                
                sx={{
                  mb: 2,
                  width: '100%',
                }}
              >
                {answerOption.answerText}
              </Button>
            ))}
          </Box>
        </Box>
      ))}

      <Box mt={4}>
        <Typography variant="h6" align="center">
          Додати нове питання
        </Typography>
        <TextField
          label="Питання"
          variant="outlined"
          value={newQuestion.questionText}
          onChange={handleQuestionTextChange}
          fullWidth
          margin="normal"
        />
        {newQuestion.answerOptions.map((answerOption, index) => (
          <TextField
            key={index}
            label={`Відповідь ${index + 1}`}
            variant="outlined"
            value={answerOption.answerText}
            onChange={(event) => handleAnswerOptionChange(event, index)}
            fullWidth
            margin="normal"
          />
        ))}
        <TextField
          select
          label="Правильна відповідь"
          variant="outlined"
          value={newQuestion.correctAnswerIndex}
          onChange={handleCorrectAnswerChange}
          fullWidth
          margin="normal"
        >
          {newQuestion.answerOptions.map((_, index) => (
            <MenuItem key={index} value={index}>
              {index + 1}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={handleAddQuestion}
          disabled={!newQuestion.questionText.trim() || newQuestion.correctAnswerIndex === -1}
        >
          Додати питання
        </Button>
      </Box>
    </Box>
  ) : (
    <Container maxWidth="sm">
      <Box mb={4}>
        <Typography variant="h4" align="center">Програмування С/C++</Typography>
      </Box>
      {showScore || currentQuestion >= questionsRandom.length  ? (
        
        <Box textAlign="center">
          {questionsRandom.length===0 ? (<>
          <Button onClick={handleRestartQuiz}>Розпочни тестування</Button></>) :
          (<>
            <Typography variant="h5" mb={2}>Твій результат {score} з {questionsRandom.length}</Typography>
            <Button onClick={handleRestartQuiz}>Почати заново</Button></>)}
        </Box>)
       : (
        <>
          <Box mb={4}>
            <Typography variant="h6" align="center">
              Питання {currentQuestion + 1}/{questionsRandom.length}
            </Typography>
          </Box>
          <Box bgcolor="lightgray" padding={2} marginBottom={2} width="100%" borderRadius={8}>
            <Typography variant="body1" align="left">{questionsRandom[currentQuestion].questionText}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            {questionsRandom[currentQuestion].answerOptions.map((answerOption, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                sx={{
                  mb: 2,
                  width: '100%',
                }}
              >
                {answerOption.answerText}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}

