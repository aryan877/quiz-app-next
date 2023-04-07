import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { default as MoreVertIcon } from '@mui/icons-material/MoreVert';
import QuizIcon from '@mui/icons-material/Quiz';
import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (event: any) => {
    // Delete the quiz
  };

  const handleEdit = (event: any) => {
    // Edit the quiz
  };

  return (
    <div className="quiz-card-parent" style={{ position: 'relative' }}>
      <Box
        sx={{
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0rem',
          position: 'absolute',
          top: '0',
          right: '0',
          zIndex: '10',
          borderRadius: '4px',
          backgroundColor: 'transparent',
        }}
      >
        <IconButton style={{ color: 'white' }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
            <IconButton size="small" sx={{ mr: 1 }}>
              <Edit />
            </IconButton>
            <Typography variant="body1" sx={{ color: 'black' }}>
              Edit
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <IconButton size="small" sx={{ mr: 1 }}>
              <Delete />
            </IconButton>
            <Typography variant="body1" sx={{ color: 'black' }}>
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Link href="/editquiz">
        <Card className="quiz-card">
          <Box
            sx={{
              backgroundColor: primary,
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1rem',
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              align="center"
              color="white"
            >
              {quiz.name}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'white',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
            }}
          >
            <Typography
              variant="subtitle2"
              component="h3"
              align="center"
              color="textPrimary"
            >
              Created on{' '}
              {new Date().toLocaleString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </Typography>
          </Box>
        </Card>
      </Link>
    </div>
  );
}

export default QuizCard;
