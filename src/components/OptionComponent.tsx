import {
  removeOption,
  updateOptionIsAnswer,
  updateOptionTitle,
} from '@/store/reducers/quizFormSlice';
import { OptionType } from '@/types/types';
import { Close } from '@mui/icons-material';
import { Checkbox, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditableText from './EditableText';

function Option({
  option,
  questionId,
}: {
  option: OptionType;
  questionId: string;
}) {
  const [optionTitle, setOptionTitle] = useState(option.title);
  const [checked, setChecked] = useState(option.isAnswer);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const removeOptionHandler = () => {
    dispatch(removeOption({ questionId: questionId, optionId: option.id }));
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

  useEffect(() => {
    dispatch(
      updateOptionTitle({
        questionId: questionId,
        optionId: option.id,
        title: optionTitle,
      })
    );
  }, [optionTitle, dispatch, option.id, questionId]);

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
          textState={option.title}
          setTextState={setOptionTitle}
          defaultText={option.title}
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
