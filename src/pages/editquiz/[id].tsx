import EditableText from '@/components/EditableText';
import { default as Question } from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
// import { Quiz } from '@/store/reducers/quizFormSlice';
import {
  QuestionType,
  QuizType,
  setQuiz,
} from '@/store/reducers/quizFormSlice';
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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase/firebase';

function EditQuiz() {
  const [title, setTitle] = React.useState('Untitled Quiz');
  const [description, setDescription] = React.useState('Quiz Description');
  const [timeLimit, setTimeLimit] = useState<string>('0');
  const handleTimeChange = (time: string) => {
    setTimeLimit(time);
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quizform.quiz);

  const quizId = router.query.id as string;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizCollectionRef = collection(db, 'quizzes');
        const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
        const quizDocs = await getDocs(quizQuery);
        const quizData = quizDocs.docs[0].data();
        console.log(quizData);
        dispatch(setQuiz(quizData as QuizType));
      } catch (error) {
        console.log(error);
      }
    };

    if (quizId) {
      console.log(quizId);
      fetchQuiz();
    }
  }, [quizId, dispatch]);

  // useEffect(() => {
  //   // When the data is fetched, set the quiz in the store
  //   if (data) {
  //     // dispatch(setQuiz(data));
  //     console.log(data);
  //   }
  // }, [data, dispatch]);

  // const [questions, setQuestions] = useState<QuestionType[]>([]);
  // const dispatch = useDispatch();
  // const questions = useSelector(
  //   (state: RootState) => state.quizform.quiz?.questions
  // );

  // const hasMounted = useRef(false);

  // useEffect(() => {
  //   if (!hasMounted.current) {
  //     window.scrollTo(0, 0);
  //     hasMounted.current = true;
  //   }
  // }, []);

  // const addQuestion = () => {
  //   const newQuestion = {
  //     id: uuidv4(),
  //     title: 'New Question',
  //     prompt: '',
  //     options: [
  //       { id: uuidv4(), title: 'Option 1' },
  //       { id: uuidv4(), title: 'Option 2' },
  //       { id: uuidv4(), title: 'Option 3' },
  //     ],
  //   };

  //   // setQuestions([...questions, newQuestion]);
  //   if (document.documentElement.scrollHeight > window.innerHeight) {
  //     window.scrollTo(0, document.documentElement.scrollHeight);
  //   }
  // };

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
        mt: 4,
      }}
    >
      <Card sx={{ backgroundColor: '#fff', p: 2, mt: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EditableText
            textState={quiz.title}
            setTextState={setTitle}
            fontSize={'32px'}
            defaultText={quiz.title}
          />
          <EditableText
            textState={quiz.description}
            setTextState={setDescription}
            fontSize={'24px'}
            defaultText={quiz.description}
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
        <IconButton>
          {/* <IconButton onClick={addQuestion}> */}
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditQuiz;
