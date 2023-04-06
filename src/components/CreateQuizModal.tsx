import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React, { FC, useState } from 'react';

type CreateQuizModalProps = {
  handleClose: () => void;
  openModal: boolean;
};

// Create Quiz Modal
const CreateQuizModal: FC<CreateQuizModalProps> = ({
  handleClose,
  openModal,
}) => {
  const theme = useTheme();

  const [quizName, setQuizName] = useState<string>('');

  const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
  };

  const createButtonDisabled = quizName.length < 1;

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="create-quiz-modal-title"
      aria-describedby="create-quiz-modal-description"
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
            onClick={handleClose}
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
      </Box>
    </Modal>
  );
};

export default CreateQuizModal;
