import TextField from '@mui/material/TextField';
import { useState } from 'react';

interface EditableTextProps {
  defaultText: string;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  textState: string;
  fontSize: string;
  bold?: boolean;
  refProp?: React.RefObject<HTMLInputElement>;
}

function EditableText({
  defaultText,
  setTextState,
  textState,
  fontSize,
  bold,
  refProp,
}: EditableTextProps) {
  const [initialTextState, setInitialTextState] = useState(defaultText);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextState(e.target.value);
  };

  const handleTextBlur = () => {
    if (textState.trim() === '') {
      setTextState(initialTextState);
    }
  };

  return (
    <TextField
      value={textState}
      onChange={handleTextChange}
      onBlur={handleTextBlur}
      autoFocus
      fullWidth
      multiline
      variant="standard"
      inputRef={refProp}
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
          fontWeight: bold ? 'bold' : '',
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
