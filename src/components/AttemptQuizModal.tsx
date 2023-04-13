import { RootState } from '@/store/reducers';
import { QuizType } from '@/types/types';
import { Close, FileCopyOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type AttemptQuizModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttemptQuizModal: FC<AttemptQuizModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string | undefined>(''); // Keep track of the selected quiz id
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [quizLink, setQuizLink] = useState('');
  const quizzes = useSelector((state: RootState) => state.quizCards.quizzes);
  const router = useRouter();
  const handleOptionClick = (quizId: string | undefined) => {
    setSelectedQuizId(quizId); // Set the selected quiz id
  };

  const handleBackClick = () => {
    setSelectedQuizId(''); // Reset the selected quiz id
    setIsSnackbarOpen(false);
  };
  const theme = useTheme();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(quizLink);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleCloseModal = () => {
    setIsSnackbarOpen(false);
    setOpenModal(false);
    setSelectedQuizId('');
  };

  const handleStartTest = () => {
    router.push(`/startquiz/${selectedQuizId}`);
  };

  useEffect(() => {
    const link = `${window.location.origin}/startquiz/${selectedQuizId}`;
    setQuizLink(link);
  }, [selectedQuizId]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
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
          p: 2,
          pb: 4,
          zIndex: 9999, // Or any other high value
          transition: 'height 0.5s ease-in-out', // Add transition property to height
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
          <IconButton // Use IconButton instead of Button
            onClick={handleCloseModal}
            color="primary"
            // sx={{ ml: 1 }}
          >
            <Close />
          </IconButton>
        </Box>

        {selectedQuizId ? (
          // Render quiz details with copy link
          <>
            <Typography
              id="create-quiz-modal-title"
              variant="h6"
              align="center"
              gutterBottom
              fontWeight="bold"
            >
              Test Your Understanding
            </Typography>
            <Typography
              id="create-quiz-modal-title"
              variant="body1"
              align="center"
              gutterBottom
              color="red"
              fontWeight="bold"
            >
              Copy to share link{' '}
              <Box component="span" sx={{ color: theme.palette.primary.dark }}>
                OR
              </Box>{' '}
              open test from link below
            </Typography>
            <TextField
              sx={{ mt: 1, mb: 2 }}
              fullWidth
              value={`${window.location.origin}/startquiz/${
                quizzes.find((quiz) => quiz.id === selectedQuizId)?.id
              }`}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleCopyClick}>
                    <FileCopyOutlined />
                  </IconButton>
                ),
              }}
            />
            <Button onClick={handleStartTest}>Open Link</Button>
            <Divider></Divider>
            <Box sx={{ px: 3, mt: 2 }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>quiz title:</span>{' '}
                {
                  quizzes.find(
                    (quiz: Partial<QuizType>) => quiz.id === selectedQuizId
                  )?.title
                }
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <span style={{ fontWeight: 'bold' }}>quiz description:</span>{' '}
                {
                  quizzes.find(
                    (quiz: Partial<QuizType>) => quiz.id === selectedQuizId
                  )?.description
                }
              </Typography>
            </Box>
            <Button sx={{ mt: 2 }} onClick={handleBackClick}>
              back
            </Button>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={1000}
              onClose={handleCloseSnackbar}
              message="Link copied to clipboard!"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            />
          </>
        ) : (
          // Render all quizzes list
          <>
            <Typography
              id="create-quiz-modal-title"
              variant="h6"
              align="center"
              gutterBottom
              fontWeight="bold"
            >
              Attempt Quiz
            </Typography>
            <Typography
              id="create-quiz-modal-title"
              variant="body1"
              align="center"
              gutterBottom
            >
              Select the quiz you wish to attempt
            </Typography>

            <Divider></Divider>

            <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
              <List>
                {quizzes.map((quiz, index) => (
                  <React.Fragment key={quiz.id}>
                    <ListItemButton onClick={() => handleOptionClick(quiz.id)}>
                      <ListItemText primary={`#${index + 1} ${quiz.title}`} />
                    </ListItemButton>
                    {index !== quizzes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </List>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AttemptQuizModal;
