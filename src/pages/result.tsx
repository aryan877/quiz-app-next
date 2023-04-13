import { RootState } from '@/store/reducers';
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type ResultItem = {
  question: string;
  selectedOption: string;
  correctOption: string;
};

type ResultData = {
  score: number;
  totalQuestions: number;
  results: ResultItem[];
};

function Result() {
  const [result, setResult] = useState<ResultData | null>(null);
  const testData = useSelector((state: RootState) => state.quizTestData.quiz);
  const router = useRouter();
  useEffect(() => {
    const postResult = async () => {
      try {
        const { data } = await axios.post<ResultData>(
          '/api/get-result',
          testData
        );
        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (testData.questions.length > 0) {
      postResult();
    } else {
      router.push('/');
    }
  }, [testData, router]);

  const questionStyle = {
    backgroundColor: '#FFF9C4',
    p: 2,
    mb: 1,
  };

  const answerStyle = {
    p: 2,
    mb: 1,
  };

  const correctAnswerStyle = {
    ...answerStyle,
    backgroundColor: '#C8E6C9',
  };

  const wrongAnswerStyle = {
    ...answerStyle,
    backgroundColor: '#FFCDD2',
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Quiz Report
      </Typography>
      {result ? (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            You scored {result.score} out of {result.results.length}
          </Typography>
          <Box>
            {result.results.map((resultItem) => (
              <Card sx={{ p: 3, mb: 2 }} key={resultItem.question}>
                <Typography variant="h6" sx={questionStyle}>
                  {resultItem.question}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={
                    resultItem.selectedOption === resultItem.correctOption
                      ? correctAnswerStyle
                      : wrongAnswerStyle
                  }
                >
                  <strong>Your answer:</strong> {resultItem.selectedOption}
                </Typography>
                <Typography variant="subtitle1" sx={correctAnswerStyle}>
                  <strong>Correct answer:</strong> {resultItem.correctOption}
                </Typography>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  );
}

export default Result;
