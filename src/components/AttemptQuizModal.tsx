import { RootState } from '@/store/reducers';
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
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
  const [selectedOption, setSelectedOption] = useState<string>(''); // Keep track of the selected option
  const quizzes = useSelector((state: RootState) => state.quizCards.quizzes);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Set the selected option
    setOpenModal(false); // Close the modal
  };

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
          Take Test
        </Typography>

        <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
          {quizzes.map((quiz) => (
            <ListItemButton
              key={quiz.id}
              onClick={() => handleOptionClick(quiz.id)}
            >
              <ListItemText primary={quiz.title} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
          >
            <Typography variant="button">Cancel</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AttemptQuizModal;
