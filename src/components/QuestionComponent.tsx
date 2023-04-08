import EditableText from '@/components/EditableText';
import Option from '@/components/OptionComponent';
import { QuestionType } from '@/store/reducers/quizFormSlice';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  question: QuestionType;
  index: number;
}

function Question({ question, index }: Props) {
  const [questionTitle, setQuestionTitle] = useState(question.prompt);

  return (
    <Card sx={{ my: 2, p: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, px: 1 }} component="div">
            {`${index}.`}
          </Typography>
          <EditableText
            textState={questionTitle}
            setTextState={setQuestionTitle}
            defaultText={questionTitle}
            fontSize={'20px'}
            bold
          />
        </Box>
        {question.options?.map((option) => (
          <Option key={option.id} option={option} />
        ))}

        <Box sx={{ ml: 2 }}>
          <Tooltip title="Add option" sx={{ my: 2 }}>
            <IconButton>
              <AddCircleIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              ml: 1,
              mt: 4,
            }}
          >
            <TextField
              label="Points"
              type="number"
              defaultValue={question.points}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mr: 1 }}
            />

            <Tooltip title="Delete question">
              <IconButton>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Question;
