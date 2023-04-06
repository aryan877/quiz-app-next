import GlobalNotification from '@/components/GlobalNotification';
import Navbar from '@/components/Navbar';
import QuizCard from '@/components/QuizCard';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React from 'react';

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

  return (
    <>
      <GlobalNotification />
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: '2rem',
        }}
      >
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
            style={{ marginRight: '1rem', boxShadow: 'none' }}
          >
            Create Quiz
          </Button>
          <Button
            variant="contained"
            startIcon={<QuizIcon />}
            style={{ boxShadow: 'none' }}
          >
            Attempt Quiz
          </Button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            My Quizzes
          </Typography>

          <Grid container spacing={3} style={{ justifyContent: 'center' }}>
            {quizzes.map((quiz) => (
              <Grid key={quiz.id} item xs={12} sm={6} md={4}>
                <QuizCard quiz={quiz}></QuizCard>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Index;
