import EditableText from '@/components/EditableText';
import Option from '@/components/OptionComponent';
import { QuestionType } from '@/store/reducers/quizFormSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  question: QuestionType;
  index: number;
}

function Question({ question, index }: Props) {
  const [questionTitle, setQuestionTitle] = useState(question.title);

  return (
    <Card sx={{ my: 2, bgcolor: '#f5f5f5', p: 2 }}>
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
            defaultText={question.title}
            fontSize={'24px'}
          />
        </Box>
        <Typography variant="body1" gutterBottom>
          {question.prompt}
        </Typography>

        {question.options?.map((option) => (
          <Option key={option.id} option={option} />
        ))}
        <Tooltip sx={{ ml: 2, mt: 2 }} title="Add option">
          <IconButton>
            <AddCircleIcon color="primary" />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default Question;
