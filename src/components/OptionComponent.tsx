import Question from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  removeOption,
  updateOptionIsAnswer,
  updateOptionTitle,
} from '@/store/reducers/quizFormSlice';
import { OptionType } from '@/types/types';
import { Close } from '@mui/icons-material';
import { Checkbox, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableText from './EditableText';
function Option({
  option,
  questionId,
}: {
  option: OptionType;
  questionId: string;
}) {
  const [checked, setChecked] = useState(option.isAnswer);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const options = useSelector((state: RootState) => {
    const question = state.quizform.quiz.questions.find(
      (q) => q.id === questionId
    );
    return question ? question.options : [];
  });

  const removeOptionHandler = () => {
    if (options.length > 1) {
      dispatch(removeOption({ questionId: questionId, optionId: option.id }));
    } else {
      dispatch(
        addNotification({
          type: 'error',
          message: 'You need to set at least one option',
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      updateOptionIsAnswer({
        questionId: questionId,
        optionId: option.id,
        isAnswer: checked,
      })
    );
  }, [checked, dispatch, questionId, option.id]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ width: '100%', margin: 0 }}
    >
      <Grid item>
        <Checkbox checked={option.isAnswer} onChange={handleCheckboxChange} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <EditableText
          key={option.id}
          text={option.title}
          updateAction={updateOptionTitle}
          questionId={questionId}
          optionId={option.id}
          fontSize={'16px'}
        />
      </Grid>
      <Grid item>
        <Tooltip onClick={removeOptionHandler} title="Remove">
          <IconButton>
            <Close />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Option;
