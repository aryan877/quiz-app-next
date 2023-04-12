import { QuizType } from '@/types/types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function StartQuiz() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizType>({
    id: '',
    title: '',
    description: '',
    questions: [],
    timelimit: 0,
  });

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(
          `/api/get-quiz-by-id-test?id=${router.query.id}`
        );
        const data = response.data as QuizType;
        console.log(data);
        setQuizData(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (router.query.id) {
      fetchQuiz();
    }
  }, [router.query.id]);

  const totalPoints = quizData.questions.reduce(
    (total, question) => total + question.points,
    0
  );

  return (
    <Box
      sx={{
        maxWidth: 'md',
        width: '100%',
        mt: 8,
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        Attempt Quiz
      </Typography>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <span style={{ fontWeight: 'bold' }}>Quiz Title:</span>{' '}
            {quizData.title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
            <span style={{ fontWeight: 'bold' }}>Total Points:</span>{' '}
            {totalPoints}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <span style={{ fontWeight: 'bold' }}>Quiz Description: </span>{' '}
            {quizData.description}
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontWeight: 'bold' }}>Time Limit:&nbsp;</span>
            {quizData.timelimit} minutes <AccessTimeIcon sx={{ ml: 1 }} />
          </Typography>

          <Typography variant="body2" component="p" sx={{ mt: 2 }}>
            <span style={{ fontWeight: 'bold' }}>Instructions:</span> Once you
            press Start Quiz, the quiz will begin. You will have{' '}
            {quizData.timelimit} minutes to complete the quiz. Press Submit to
            end the test and see your results. The quiz will end automatically
            when the time is up.
          </Typography>
        </CardContent>
      </Card>
      {/* <Link href={`/s`}> */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" size="large" color="primary">
          Start Quiz
        </Button>
      </Box>
      {/* </Link> */}
    </Box>
  );
}

export default StartQuiz;
