import { addNotification } from '@/store/reducers/notificationSlice';
import { QuizType } from '@/store/reducers/quizFormSlice';
import { removeQuizByIdinList } from '@/store/reducers/quizIndexSlice';
import { Delete, Edit } from '@mui/icons-material';
import { default as MoreVertIcon } from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function QuizCard({ quiz }: { quiz: any }) {
  //hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  //hooks
  //handlers
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      dispatch(
        addNotification({
          type: 'info',
          message: 'Deleting quiz...',
        })
      );
      const response = await axios.get(`/api/delete-quiz-by-id?id=${quiz.id}`);
      dispatch(
        addNotification({
          type: 'success',
          message: 'Quiz deleted successfully',
        })
      );
      dispatch(removeQuizByIdinList(quiz.id));
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          type: 'error',
          message: 'An error occurred while deleting the quiz',
        })
      );
    }
  };
  const handleEdit = () => {
    // Edit the quiz
    router.push(`/editquiz/${quiz.id}`);
  };
  //handlers
  return (
    <Card
      className="quiz-card-parent"
      sx={{
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid transparent',
      }}
    >
      {/* <Box> */}
      <Box
        sx={{
          position: 'absolute',
          right: '0',
          top: '0',
          zIndex: '999',
        }}
      >
        <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          disableScrollLock={true}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'white',
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Edit />
            </IconButton>
            <Typography variant="body1">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Delete />
            </IconButton>
            <Typography variant="body1">Delete</Typography>
          </MenuItem>
        </Menu>
      </Box>
      {/* ============ */}

      <Link href={`/editquiz/${quiz.id}`}>
        <Box
          className="quiz-card-top"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.4rem 1rem',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography
            mr={3}
            align="left"
            variant="h6"
            color={theme.palette.secondary.main}
          >
            {quiz.title}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '0.4rem 1rem',
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Typography align="left" variant="subtitle2">
            {quiz.createdAt && (
              <>
                Created on{' '}
                {new Date(quiz.createdAt.seconds * 1000).toLocaleString(
                  'en-US'
                )}
              </>
            )}
          </Typography>
        </Box>
      </Link>
      {/* </Box> */}
    </Card>
  );
}

export default QuizCard;
