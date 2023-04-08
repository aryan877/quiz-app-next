import EditableText from '@/components/EditableText';
import { default as Question } from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
import { increment } from '@/store/reducers/counterSlice';
// import { Quiz } from '@/store/reducers/quizFormSlice';
import { QuestionType } from '@/store/reducers/quizFormSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function EditQuiz() {
  const [title, setTitle] = React.useState('Untitled Quiz');

  // const [questions, setQuestions] = useState<QuestionType[]>([]);
  // const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.quizform.quiz?.questions
  );

  const addQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      title: 'New Question',
      prompt: '',
      options: [
        { _id: uuidv4(), title: 'Option 1' },
        { _id: uuidv4(), title: 'Option 2' },
        { _id: uuidv4(), title: 'Option 3' },
      ],
    };

    // setQuestions([...questions, newQuestion]);
    if (document.documentElement.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  };

  // useEffect(() => {
  //   if (document.documentElement.scrollHeight > window.innerHeight) {
  //     window.scrollTo(0, document.documentElement.scrollHeight);
  //   }
  //   // return () => {
  //   //   second
  //   // }
  // }, [questions]);

  return (
    <Box
      sx={{
        marginBottom: '100px',
        maxWidth: 'md',
        width: '100%',
      }}
    >
      <EditableText
        textState={title}
        setTextState={setTitle}
        fontSize={'32px'}
        defaultText={title}
      />

      {questions &&
        questions.map((question: QuestionType, index: number) => (
          <Question key={question.id} index={index + 1} question={question} />
        ))}

      <Tooltip title="Add question">
        <IconButton onClick={addQuestion}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditQuiz;
