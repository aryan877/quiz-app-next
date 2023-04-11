import TextField from '@mui/material/TextField';
interface EditableTextProps {
  defaultText: string;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  textState: string;
  fontSize: string;
  bold?: boolean;
  autoFocus?: boolean;
}

function EditableText({
  defaultText,
  setTextState,
  textState,
  fontSize,
  bold,
  autoFocus = false,
}: EditableTextProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextState(e.target.value);
  };

  const handleTextBlur = () => {
    if (textState.trim() === '') {
      setTextState(defaultText);
    }
  };

  return (
    <TextField
      value={textState}
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
