import { QuizType } from '@/store/reducers/quizFormSlice';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, getDoc, Timestamp } from 'firebase/firestore';

import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import db from '../../firebase/firebase';
type CreateQuizModalProps = {
  openModal: boolean;
  setOpenModal: any;
};

// Create Quiz Modal
const CreateQuizModal: FC<CreateQuizModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [quizName, setQuizName] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  // router.push(`/edit/${docRef.id}`);

  const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
  };

  const quiz: QuizType = {
    id: uuidv4(),
    title: quizName,
    description: 'enter description',
    questions: [],
    createdAt: Timestamp.fromDate(new Date()),
  };

  const handleClose = async () => {
    // Initialize quizzes collection
    const quizzesCollection = collection(db, 'quizzes');
    // Add quiz data to quizzes collection
    try {
      const docRef = await addDoc(quizzesCollection, quiz);
      // Get the newly added document from the database to retrieve the id field
      const docSnapshot = await getDoc(docRef);
      const quizData = docSnapshot.data();
      const quizId = quizData?.id;
      console.log('Quiz added with ID: ', quizId);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setOpenModal(false);
        router.push(`/editquiz/${quizId}`);
      }, 2000);
    } catch (error) {
      console.error('Error adding quiz: ', error);
    }
  };

  const createButtonDisabled = quizName.length < 1;

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="create-quiz-modal-title"
      aria-describedby="create-quiz-modal-description"
      disableScrollLock={true}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '4px',
          p: 4,
          zIndex: 9999, // Or any other high value
        }}
      >
        <Typography
          id="create-quiz-modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Create Quiz
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Enter Quiz Name"
            fullWidth
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            disabled={createButtonDisabled}
            sx={{ ml: 1 }}
          >
            Create
          </Button>
        </Box>
        {isSuccess && (
          <Box sx={{ mt: 2 }}>
            <Typography color="green">Quiz successfully created!</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreateQuizModal;
