// //stop client side re-direct
// useEffect(() => {
//   const handleRouteChange = (
//     url: string,
//     { shallow }: { shallow: boolean }
//   ) => {
//     const confirmationMessage =
//       'Are you sure you want to leave this page? Your quiz data will be lost.';
//     if (!shallow && !confirm(confirmationMessage)) {
//       router.events.emit('routeChangeError');
//       throw 'routeChange aborted.';
//     }
//   };

//   router.events.on('routeChangeStart', handleRouteChange);

//   return () => {
//     router.events.off('routeChangeStart', handleRouteChange);
//   };
// }, [router]);

// //stop browser re-direct
// useEffect(() => {
//   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//     event.preventDefault();
//     const confirmationMessage =
//       'Are you sure you want to leave this page? Your quiz data will be lost.';
//     event.returnValue = confirmationMessage;
//     return confirmationMessage;
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, []);

import { RootState } from '@/store/reducers';
import {
  moveNext,
  movePrev,
  selectAnswer,
  setCurrentQuestion,
  setQuizTestData,
} from '@/store/reducers/quizTestSlice';
import { QuestionType, QuizType } from '@/types/types';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Quiztaker() {
  const router = useRouter();
  const quiz = useSelector((state: RootState) => state.quizTestData.quiz);
  const id = router.query.id as string;
  const currentQuestion = useSelector(
    (state: RootState) => state.quizTestData.currentQuestion
  );
  const dispatch = useDispatch();

  //fetch quiz data
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/get-quiz-by-id-test?id=${id}`);
        const data = response.data as QuizType;
        dispatch(setQuizTestData(data));
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchQuiz();
    }
  }, [id, dispatch]);

  // set the current question to the first question on mount
  useEffect(() => {
    if (quiz.questions.length > 0 && !currentQuestion) {
      dispatch(setCurrentQuestion(quiz.questions[0]));
    }
  }, [dispatch, quiz, currentQuestion]);

  const handleOptionChange = (question: QuestionType, optionId: string) => {
    dispatch(selectAnswer({ questionId: question.id, answerId: optionId }));
  };

  const handlePrevClick = () => {
    dispatch(movePrev());
  };

  const handleNextClick = () => {
    dispatch(moveNext());
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>
      {currentQuestion && (
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="body1">{currentQuestion.prompt}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name={`question-${currentQuestion.id}`}
                onChange={(e) =>
                  handleOptionChange(currentQuestion, e.target.value)
                }
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio checked={option.isAnswer} />}
                    label={option.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              // disabled={!currentQuestion.canMovePrev}
              onClick={handlePrevClick}
              sx={{ mt: 2 }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              // disabled={!currentQuestion.canMoveNext}
              onClick={handleNextClick}
              sx={{ mt: 2, ml: 2 }}
            >
              Next
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Quiztaker;
