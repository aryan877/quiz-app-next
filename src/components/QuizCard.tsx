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
};

function QuizCard({ quiz }: QuizCardProps) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        boxShadow: 'none',
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
          <IconButton sx={{ color: theme.palette.primary.main }}>
            <Typography
              variant="button"
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
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
              bgcolor: theme.palette.primary.main,
            }}
          />
          <Tooltip title="Delete">
            <IconButton sx={{ color: theme.palette.primary.main }}>
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
        <Typography variant="h6" component="h3" align="center">
          {quiz.name}
        </Typography>
      </Box>
    </Card>
  );
}

export default QuizCard;
