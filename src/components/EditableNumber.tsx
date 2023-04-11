import TextField from '@mui/material/TextField';
import { useState } from 'react';

interface EditableTextProps {
  setNumberState: React.Dispatch<React.SetStateAction<number>>;
  numberState: number;
  fontSize: string;
  label: string;
  bold?: boolean;
}

function EditableText({
  setNumberState,
  numberState,
  label,
  fontSize,
  bold,
}: EditableTextProps) {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      setNumberState(1);
    } else {
      setNumberState(Number(e.target.value));
    }
  };

  const handleNumberBlur = () => {
    if (numberState === Number(0)) {
      setNumberState(1);
    }
  };

  return (
    <TextField
      value={numberState}
      label={label}
      type="number"
      onChange={handleNumberChange}
      onBlur={handleNumberBlur}
      InputProps={{ inputProps: { min: 1, required: true } }}
      sx={{
        border: 'none',
        borderRadius: 0,
        fontSize: fontSize,
        fontWeight: bold ? 'bold' : '',
      }}
    />
  );
}

export default EditableText;
