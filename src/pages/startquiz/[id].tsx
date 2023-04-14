import { default as QuizTaker } from '@/components/QuizTaker';
import { QuizType } from '@/types/types';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function StartQuiz() {
  const router = useRouter();
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<Partial<QuizType>>({
    id: '',
    title: '',
    description: '',
    points: 1,
    timelimit: 0,
  });

  const id = router.query.id;

  const handleStartQuiz = () => {
    setStart(true);
  };
  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/get-quiz-by-id-pre-test?id=${id}`
        );
        setLoading(false);
        const data = response.data as QuizType;
        setQuizData(data);
      } catch (error) {
        setLoading(false);
        router.push('/404');
      }
    }
    if (id) {
      fetchQuiz();
    }
  }, [id, router]);

  if (!start) {
    return (
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Card sx={{ p: 4 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {' '}
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {quizData.title}
              </Typography>
              <Divider sx={{ width: '100%', mb: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 2,
                }}
              >
                <Typography variant="body1" textAlign="left">
                  <Box fontWeight="bold" component="span">
                    Total Points:
                  </Box>{' '}
                  {quizData.points}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  <Box fontWeight="bold" component="span">
                    Quiz Description:
                  </Box>{' '}
                  {quizData.description}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  <Box fontWeight="bold" component="span">
                    Time Limit:
                  </Box>{' '}
                  {quizData.timelimit} minutes
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }} textAlign="left">
                  <Box fontWeight="bold" component="span">
                    Instructions:
                  </Box>
                </Typography>
                <Typography variant="body1" color="red" textAlign="left">
                  - Once you press Start Quiz, the quiz will begin.
                </Typography>
                <Typography variant="body1" color="red" textAlign="left">
                  - You will have {quizData.timelimit} minutes to complete the
                  quiz.
                </Typography>
                <Typography variant="body1" color="red" textAlign="left">
                  - Press Submit to end the test and see your results.
                </Typography>
                <Typography variant="body1" color="red" textAlign="left">
                  - The quiz will end automatically when the time is up.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleStartQuiz}
                  sx={{ mt: 2 }}
                >
                  Start Quiz
                </Button>
              </Box>
            </>
          )}
        </Card>
      </Box>
    );
  }

  return <QuizTaker />;
}

export default StartQuiz;
