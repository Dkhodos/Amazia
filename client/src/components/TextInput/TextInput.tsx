import { styled, TextField } from "@mui/material";

const TextInput = styled(TextField)({
  '.MuiTextField-root':{
    width: '100%'
  },
  '& label.Mui-focused': {
    color: '#0269a4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0269a4',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(2,105,164,0.51)',
    },
    '&:hover fieldset': {
      borderColor: '#0269a4',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0269a4',
    },
  },
});

export default TextInput