import CreateQuizModal from '@/components/CreateQuizModal';
import GlobalNotification from '@/components/GlobalNotification';
import Navbar from '@/components/Navbar';
import QuizCard from '@/components/QuizCard';
import { QuizType } from '@/store/reducers/quizFormSlice';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from '../../firebase/firebase';

const Index = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const quizCollection = collection(db, 'quizzes');
        const quizSnapshot = await getDocs(
          query(quizCollection, orderBy('createdAt', 'desc'))
        );
        const quizList = quizSnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
          })
        );
        setQuizzes(quizList);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

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
};

export default Index;
