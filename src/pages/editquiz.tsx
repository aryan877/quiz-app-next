import QuestionComponent from '@/components/QuestionComponent';
import TextField from '@mui/material/TextField';
import * as React from 'react';

function EditableTitle() {
  const [title, setTitle] = React.useState('Untitled Quiz');
  const [editMode, setEditMode] = React.useState(false);

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (title.trim() === '') {
      setTitle('Untitled Quiz');
    }
    setEditMode(false);
  };

  return (
    <>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <TextField
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
          fullWidth
          multiline
          variant="standard"
          sx={{
            fontSize: '32px',
            fontWeight: 'bold',
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
              fontSize: 'inherit',
              fontWeight: 'bold',
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
      </div>
      <QuestionComponent />
      <QuestionComponent />
      <QuestionComponent />
      <QuestionComponent />
      <QuestionComponent />
    </>
  );
}

export default EditableTitle;
