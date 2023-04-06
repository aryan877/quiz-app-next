import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

type QuizCardProps = {
  quiz: Record<string, any>;
  primary: string;
};

function QuizCard({ quiz, primary }: QuizCardProps) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: primary,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
            px: 1,
          }}
        >
          <IconButton sx={{ color: primary }}>
            <Typography
              variant="button"
              sx={{ color: primary, fontWeight: 'bold' }}
            >
              Edit
            </Typography>
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: '100%',
              mx: 1,
              bgcolor: primary,
            }}
          />
          <Tooltip title="Delete">
            <IconButton sx={{ color: primary }}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <Typography variant="h6" component="h3" align="center" color="white">
          {quiz.name}
        </Typography>
      </Box>
    </Card>
  );
}

export default QuizCard;
