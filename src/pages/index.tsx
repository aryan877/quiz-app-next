import CreateQuizModal from '@/components/CreateQuizModal';
import QuizCard from '@/components/QuizCard';
import { RootState } from '@/store/reducers';
import { addQuizzesList } from '@/store/reducers/quizIndexSlice';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  //states
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  //states
  //hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: RootState) => state.quizIndex.quizzes);
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/get-all-quizzes');
        dispatch(addQuizzesList(response.data));
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [dispatch]);
  //hooks
  //render
  return (
    <Box sx={{ my: 4, width: '100%' }}>
      {/* buttons to create and take quiz */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon style={{ color: theme.palette.primary.main }} />}
          style={{
            marginRight: '1rem',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Quiz
        </Button>
        {/* Modal To Create The the Quiz */}
        <CreateQuizModal openModal={openModal} setOpenModal={setOpenModal} />
        {/* Button To Take the Quiz */}
        <Button
          variant="contained"
          startIcon={<QuizIcon style={{ color: theme.palette.primary.main }} />}
          style={{
            marginRight: '1rem',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          Attempt Quiz
        </Button>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          All Quizzes ({quizzes.length})
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: 'start' }}>
            {quizzes.map((quiz) => (
              <Grid key={quiz.id} item>
                <QuizCard quiz={quiz} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Box>
  );
  //render
};

export default Index;
