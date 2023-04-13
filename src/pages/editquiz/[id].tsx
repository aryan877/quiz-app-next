import { default as EditableNumber } from '@/components/EditableNumber';
import { default as EditableText } from '@/components/EditableText';
import Question from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
import { removePath, setPath } from '@/store/reducers/pathSlice';
import {
  addQuestion,
  removeQuiz,
  setQuiz,
  updateQuizDescription,
  updateQuizTimeLimit,
  updateQuizTitle,
} from '@/store/reducers/quizFormSlice';
import { QuestionType, QuizType } from '@/types/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function EditQuiz() {
  const router = useRouter();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quizform.quiz);

  const [quizTitle, setQuizTitle] = React.useState(quiz.title);
  const [description, setDescription] = React.useState(quiz.description);
  const [timeLimit, setTimeLimit] = useState<number>(quiz.timelimit);
  // to autofocus the last element
  const [lastAddedIndex, setLastAddedIndex] = useState(-1);

  const addQuestionHandler = () => {
    const newQuestion = {
      id: uuidv4(),
      prompt: 'Question',
      points: 1,
      options: [{ id: uuidv4(), title: 'Option', isAnswer: false }],
    };
    setLastAddedIndex(quiz.questions.length);
    dispatch(addQuestion(newQuestion));
  };

  useEffect(() => {
    dispatch(updateQuizTitle(quizTitle));
  }, [quizTitle, dispatch]);

  useEffect(() => {
    dispatch(updateQuizTimeLimit(timeLimit));
  }, [timeLimit, dispatch]);

  useEffect(() => {
    dispatch(updateQuizDescription(description));
  }, [description, dispatch]);

  useEffect(() => {
    dispatch(setPath('quiz_edit'));
    return () => {
      dispatch(removePath());
    };
  }, [dispatch]);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `/api/get-quiz-by-id?id=${router.query.id}`
        );
        const quizData = response.data;
        dispatch(setQuiz(quizData as QuizType));
      } catch (error) {
        console.log(error);
      }
    };

    if (router.query.id) {
      fetchQuiz();
    }
    return () => {
      dispatch(removeQuiz());
    };
  }, [router.query.id, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: 'md',
        width: '100%',
        mt: 4,
      }}
    >
      <Card sx={{ backgroundColor: '#fff', px: 2, py: 1, mt: 1, mb: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EditableText
            textState={quiz.title}
            setTextState={setQuizTitle}
            fontSize={'32px'}
            bold
            defaultText={quiz.title}
          />
          <EditableText
            textState={quiz.description}
            setTextState={setDescription}
            fontSize={'16px'}
            defaultText={quiz.description}
          />
          <Box sx={{ mt: 2 }}>
            <EditableNumber
              setNumberState={setTimeLimit}
              numberState={quiz.timelimit}
              fontSize={'16px'}
              label={'Time Limit in Minutes'}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#666', display: 'flex', mt: 2, alignItems: 'center' }}
          >
            Note:&nbsp;Mark the correct option for all questions&nbsp;
            <CheckBoxIcon sx={{ ml: 1 }} />
          </Typography>
        </CardContent>
      </Card>

      {quiz.questions &&
        quiz.questions.map((question: QuestionType, index: number) => (
          <Question
            key={question.id}
            index={index + 1}
            question={question}
            autofocus={index == lastAddedIndex}
          />
        ))}

      <Tooltip title="Add question">
        <IconButton
          onClick={addQuestionHandler}
          sx={{
            backgroundColor: 'primary',
          }}
        >
          {/* <IconButton onClick={addQuestion}> */}
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditQuiz;
