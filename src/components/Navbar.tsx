import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import { QuizType } from '@/types/types';
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const path = router.pathname;
  const updatedQuiz = useSelector((state: RootState) => state.quizform.quiz);
  const dispatch = useDispatch();
  const currentPath = useSelector(
    (state: RootState) => state.currentPath.currentPath
  );

  const saveQuiz = async () => {
    try {
      // call the API method with updated quiz data
      dispatch(
        addNotification({
          type: 'info',
          message: 'Saving quiz...',
        })
      );
      const response = await axios.put(
        `/api/update-quiz-by-id?id=${id}`,
        updatedQuiz
      );
      dispatch(
        addNotification({
          type: 'success',
          message: 'Quiz saved successfully',
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          type: 'error',
          message: 'An error occurred while updating the quiz',
        })
      );
    }
  };

  const submitQuiz = () => {};

  return (
    <AppBar position="fixed" sx={{ zIndex: '99999' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Link href="/">
            <Box sx={{ flexGrow: 0, p: 1 }}>
              <Typography variant="h6" component="div">
                QuizMaker
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 0, p: 1 }}>
            {/* <Typography variant="h6" component="div">
              Total 100 Points
            </Typography> */}
            {currentPath === 'quiz_edit' && (
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                }}
                onClick={() => saveQuiz()}
              >
                <Typography variant="button" color={theme.palette.primary.main}>
                  Save Quiz
                </Typography>
              </Button>
            )}

            {currentPath === 'quiz_take' && (
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                }}
                onClick={() => submitQuiz()}
              >
                <Typography variant="button" color={theme.palette.primary.main}>
                  Submit Quiz
                </Typography>
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
