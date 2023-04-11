import { default as EditableNumber } from '@/components/EditableNumber';
import EditableText from '@/components/EditableText';
import Option from '@/components/OptionComponent';
import {
  addOption,
  OptionType,
  QuestionType,
  removeQuestion,
  updateQuestionPoints,
  updateQuestionPrompt,
} from '@/store/reducers/quizFormSlice';
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
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  question: QuestionType;
  index: number;
}

function Question({ question, index }: Props) {
  const [questionPrompt, setquestionPrompt] = useState(question.prompt);
  const [questionPoints, setQuestionPoints] = useState<number>(question.points);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const removeQuestionHandler = () => {
    dispatch(removeQuestion(question.id));
  };

  const addOptionHandler = () => {
    const newOption = {
      id: uuidv4(),
      title: 'Option',
      isAnswer: false,
    } as OptionType;
    dispatch(addOption({ questionId: question.id, option: newOption }));
  };

  useEffect(() => {
    dispatch(
      updateQuestionPoints({ questionId: question.id, points: questionPoints })
    );
  }, [questionPoints, dispatch, question.id]);

  useEffect(() => {
    dispatch(
      updateQuestionPrompt({ questionId: question.id, prompt: questionPrompt })
    );
  }, [questionPrompt, question.id, dispatch]);

  return (
    <Card sx={{ my: 2, py: { xs: 0, sm: 1 }, px: { xs: 0, sm: 2 } }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{ flexGrow: 1, mr: 1, fontSize: '16px' }}
            component="div"
          >
            {`${index}.`}
          </Typography>
          <EditableText
            textState={question.prompt}
            setTextState={setquestionPrompt}
            defaultText={questionPrompt}
            fontSize={'16px'}
            // inputRef={inputRef}
          />
        </Box>

        {question.options?.map((option) => (
          <Option key={option.id} option={option} questionId={question.id} />
        ))}

        <Box sx={{ ml: 2 }}>
          <Tooltip title="Add option" onClick={addOptionHandler} sx={{ my: 0 }}>
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
              mt: 2,
            }}
          >
            {/* <TextField
              label="Points"
              type="number"
              defaultValue={question.points}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mr: 1 }}
            /> */}

            <EditableNumber
              setNumberState={setQuestionPoints}
              numberState={question.points}
              fontSize={'24px'}
              label={'Points'}
            />

            <Tooltip title="Delete question">
              <IconButton onClick={removeQuestionHandler}>
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
