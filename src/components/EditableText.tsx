import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

interface EditableTextProps {
  text: string;
  fontSize: string;
  bold?: boolean;
  autoFocus?: boolean;
  updateAction: (...args: any[]) => any;
  questionId?: string;
  optionId?: string;
}

function EditableText({
  text,
  fontSize,
  bold,
  autoFocus = false,
  updateAction,
  questionId,
  optionId,
}: EditableTextProps) {
  const dispatch = useDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (!questionId && !optionId) {
      dispatch(updateAction(newText));
    } else if (!optionId && questionId) {
      dispatch(updateAction({ questionId: questionId, prompt: newText }));
    } else if (questionId && optionId) {
      dispatch(
        updateAction({
          questionId: questionId,
          optionId: optionId,
          title: newText,
        })
      );
    }
  };

  const handleTextBlur = () => {
    if (text.trim() === '') {
    }
  };

  return (
    <TextField
      value={text}
      onChange={handleTextChange}
      onBlur={handleTextBlur}
      autoFocus={autoFocus}
      fullWidth
      multiline
      variant="standard"
      sx={{
        border: 'none',
        borderRadius: 0,
        '& .MuiOutlinedInput-root': {
          border: 'none',
          borderRadius: 0,
          '&:hover': {},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
            borderBottom: '2px #000 solid',
            padding: 0,
          },
        },
        '& .MuiInputBase-root': {
          fontSize: fontSize,
          fontWeight: bold ? 700 : undefined,
          padding: 0,
          '&:focus': {
            outline: 'none',
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: 0,
        },
      }}
    />
  );
}

export default EditableText;
