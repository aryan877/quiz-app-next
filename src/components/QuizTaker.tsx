import { RootState } from '@/store/reducers';
import { removePath, setPath } from '@/store/reducers/pathSlice';
import {
  moveNext,
  movePrev,
  selectAnswer,
  setCurrentQuestion,
  setQuizTestData,
} from '@/store/reducers/quizTestSlice';
import { QuestionType, QuizType } from '@/types/types';
import {
  Box,
  Button,
  Card,
  CardActions,
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
import { v4 as uuidv4 } from 'uuid';
function QuizTaker() {
  const router = useRouter();
  const quiz = useSelector((state: RootState) => state.quizTestData.quiz);
  const id = router.query.id as string;
  const currentQuestion = useSelector(
    (state: RootState) => state.quizTestData.currentQuestion
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPath('quiz_take'));
    return () => {
      dispatch(removePath());
    };
  }, [dispatch]);

  const questionIndex =
    quiz.questions.findIndex(
      (question) => question.id === currentQuestion?.id
    ) + 1;

  const totalQuestionsAttempted = quiz.questions.reduce(
    (count, question) =>
      question.options.some((option) => option.isAnswer) ? count + 1 : count,
    0
  );

  const points = quiz.questions[questionIndex - 1]?.points || 1;

  //fetch quiz data
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/get-quiz-by-id-test?id=${id}`);
        const data = response.data as QuizType;
        dispatch(setQuizTestData(data));
        dispatch(setCurrentQuestion(data.questions[0]));
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchQuiz();
    }
  }, [id, dispatch]);

  // set the current question to the first question on mount
  // useEffect(() => {
  //   if (quiz.questions.length > 0 && !currentQuestion) {
  //     dispatch(setCurrentQuestion(quiz.questions[0]));
  //   }
  // }, [dispatch, quiz, currentQuestion]);

  //stop client side re-direct
  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      const confirmationMessage =
        'Are you sure you want to leave this page? Your quiz data will be lost.';
      if (
        !shallow &&
        !url.includes('/result') &&
        !confirm(confirmationMessage)
      ) {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  //stop browser re-direct
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      const confirmationMessage =
        'Are you sure you want to leave this page? Your quiz data will be lost.';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCurrentQuestion(null));
    };
  }, [dispatch]);

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
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Quiz Title — {quiz.title}
      </Typography>

      {currentQuestion && (
        <Card sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Question {questionIndex}/{quiz.questions.length}
            </Typography>
            <Typography variant="body1" sx={{ ml: 0 }}>
              {currentQuestion.prompt}
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
              {points} {points > 1 ? 'points' : 'point'}
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup name={`question-${currentQuestion.id}`}>
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.title}
                    checked={option.isAnswer}
                    onClick={() =>
                      handleOptionChange(currentQuestion, option.id)
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {totalQuestionsAttempted} out of {quiz.questions.length} questions
              attempted
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={questionIndex - 1 === 0}
              onClick={handlePrevClick}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={questionIndex === quiz.questions.length}
              onClick={handleNextClick}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}

export default QuizTaker;
