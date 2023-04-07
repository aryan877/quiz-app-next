import CreateQuizModal from '@/components/CreateQuizModal';
import GlobalNotification from '@/components/GlobalNotification';
import Navbar from '@/components/Navbar';
import QuizCard from '@/components/QuizCard';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

const quizzes = [
  { id: 1, name: 'Quiz 1' },
  { id: 2, name: 'Quiz 2' },
  { id: 3, name: 'Quiz 3' },
  { id: 4, name: 'Quiz 4' },
  { id: 5, name: 'Quiz 5' },
  { id: 6, name: 'Quiz 6' },
];

const Index = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
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
          startIcon={<AddIcon />}
          style={{ marginRight: '1rem' }}
          onClick={() => setOpenModal(true)}
        >
          Create Quiz
        </Button>
        <CreateQuizModal handleClose={handleClose} openModal={openModal} />
        <Button variant="contained" startIcon={<QuizIcon />}>
          Attempt Quiz
        </Button>
      </div>

      {/* displaying all cards */}
      <div style={{ marginTop: '20px', marginBottom: '100px' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={4}
        >
          All Quizzes ({quizzes.length})
        </Typography>

        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          {quizzes.map((quiz, index) => (
            <Grid key={quiz.id} item xs={12} sm={6} md={4}>
              <QuizCard quiz={quiz} primary={theme.palette.primary.main} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Index;
