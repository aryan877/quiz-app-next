import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
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
        <Button variant="contained" style={{ marginRight: '1rem' }}>
          Create Quiz
        </Button>
        <Button variant="contained">Take Quiz</Button>
      </div>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        My Quizzes
      </Typography>
      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        {quizzes.map((quiz) => (
          <Grid key={quiz.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                ':hover': { backgroundColor: grey[900] },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  align="center"
                  style={{ marginBottom: '1rem' }}
                >
                  {quiz.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
