import { OptionType } from '@/store/reducers/quizFormSlice';
import { Close } from '@mui/icons-material';
import { Checkbox, Grid, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import EditableText from './EditableText';

function Option({ option }: { option: OptionType }) {
  const [optionTitle, setOptionTitle] = useState(option.title);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ width: '100%', margin: 0 }}
    >
      <Grid item>
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <EditableText
          key={option.id}
          textState={optionTitle}
          setTextState={setOptionTitle}
          defaultText={optionTitle}
          fontSize={'16px'}
        />
      </Grid>
      <Grid item>
        <Tooltip title="Remove">
          <IconButton>
            <Close />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Option;
