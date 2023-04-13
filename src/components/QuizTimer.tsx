import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function QuizTimer({ minutes }: { minutes: any }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon sx={{ mr: 1 }} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        Time Left —
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {minutesLeft}:{secondsLeft < 10 ? '0' : ''}
        {secondsLeft}
      </Typography>
    </Box>
  );
}

export default QuizTimer;
