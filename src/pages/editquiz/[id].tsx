import EditableText from '@/components/EditableText';
import { default as Question } from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
// import { Quiz } from '@/store/reducers/quizFormSlice';
import { QuestionType } from '@/store/reducers/quizFormSlice';
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
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function EditQuiz() {
  const [title, setTitle] = React.useState('Untitled Quiz');
  const [description, setDescription] = React.useState('Quiz Description');
  const [timeLimit, setTimeLimit] = useState<string>('0');
  const handleTimeChange = (time: string) => {
    setTimeLimit(time);
  };

  // const [questions, setQuestions] = useState<QuestionType[]>([]);
  // const dispatch = useDispatch();
  // const questions = useSelector(
  //   (state: RootState) => state.quizform.quiz?.questions
  // );

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      window.scrollTo(0, 0);
      hasMounted.current = true;
    }
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      title: 'New Question',
      prompt: '',
      options: [
        { id: uuidv4(), title: 'Option 1' },
        { id: uuidv4(), title: 'Option 2' },
        { id: uuidv4(), title: 'Option 3' },
      ],
    };

    // setQuestions([...questions, newQuestion]);
    if (document.documentElement.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  };

  // useEffect(() => {
  //   if (document.documentElement.scrollHeight > window.innerHeight) {
  //     window.scrollTo(0, document.documentElement.scrollHeight);
  //   }
  //   // return () => {
  //   //   second
  //   // }
  // }, [questions]);

  return (
    <Box
      sx={{
        marginBottom: '100px',
        maxWidth: 'md',
        width: '100%',
      }}
    >
      <Card sx={{ backgroundColor: '#fff', p: 2, mt: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EditableText
            textState={title}
            setTextState={setTitle}
            fontSize={'32px'}
            defaultText={title}
          />
          <EditableText
            textState={description}
            setTextState={setDescription}
            fontSize={'24px'}
            defaultText={description}
          />
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Time Limit in minutes"
              type="number"
              defaultValue={0}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mr: 1 }}
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
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mt: 1,
          }}
        ></Box> */}
      </Card>

      {/* {questions &&
        questions.map((question: QuestionType, index: number) => (
          <Question key={question.id} index={index + 1} question={question} />
        ))} */}

      <Tooltip title="Add question">
        <IconButton onClick={addQuestion}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditQuiz;
