import AttemptQuizModal from '@/components/AttemptQuizModal';
import CreateQuizModal from '@/components/CreateQuizModal';
import ModalWrapper from '@/components/ModalWrapper';
import QuizCard from '@/components/QuizCard';
import useFetchQuizCards from '@/hooks/fetchQuizCards';
import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  addQuizCardsData,
  removeQuizCardsData,
} from '@/store/reducers/quizCardsSlice';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Index = () => {
  //states
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);
  const [openAttemptQuizModal, setOpenAttemptQuizModal] = useState(false);
  //states
  //hooks
  const theme = useTheme();
  const quizzes = useSelector((state: RootState) => state.quizCards.quizzes);

  const isLoading = useFetchQuizCards();

  //hooks
  //render
  return (
    <Box sx={{ my: 4, width: '100%' }}>
      {/* buttons to create and Take Test */}
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
          sx={{ mr: 1 }}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
          onClick={() => setOpenCreateQuizModal(true)}
        >
          Create Quiz
        </Button>
        {/* Modal To Create The the Quiz */}
        <ModalWrapper openModal={openCreateQuizModal}>
          <CreateQuizModal
            openModal={openCreateQuizModal}
            setOpenModal={setOpenCreateQuizModal}
          />
        </ModalWrapper>
        {/* Modal To Attempt The the Quiz */}
        <ModalWrapper openModal={openAttemptQuizModal}>
          <AttemptQuizModal
            openModal={openAttemptQuizModal}
            setOpenModal={setOpenAttemptQuizModal}
          />
        </ModalWrapper>
        {/* Button To Take the Quiz */}
        <Button
          variant="contained"
          startIcon={<QuizIcon style={{ color: theme.palette.primary.main }} />}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
          onClick={() => setOpenAttemptQuizModal(true)}
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
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {quizzes.map((quiz, index) => (
              <Grid key={quiz.id} item>
                <QuizCard quiz={quiz} index={index} />
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
