import TextField from '@mui/material/TextField';

interface ITextFieldInput {
    size?: "xs" | "sm" | "md" | "lg",
    fullWidth?: boolean,
    label?: string,
    type: string,
    handleChange?: any
    name: string,
    value?: string,
    error?: string,
    touched?: boolean,
    style?: React.CSSProperties
}
const TextFieldInput: React.FC<ITextFieldInput> = ({ size, fullWidth, label, name, type, value, handleChange, touched, error, style }) => {

    const showError = Boolean(touched && error);

     const inputValue = value || '';
    return (
        <TextField
            fullWidth={fullWidth ?? false}
            id={name}

            label={label}
            variant="filled"
            type={type}
            name={name}
            value={inputValue}
            onChange={handleChange}
            error={showError}
            helperText={showError ? error : ""}
            InputProps={{ disableUnderline: true }}

            style={!showError ? { ...style } : {}}
            sx={{
                '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#999',
                },
                '& .MuiFilledInput-root': {
                   
                    borderRadius: '12px',
                    
                    backgroundColor: '#f5f5f5',
                    border: showError ? '1px solid #ff4d4f' : '1px solid transparent',
                },
                '& .MuiFilledInput-root:before, & .MuiFilledInput-root:after': {
                    display: 'none',
                },

                '& .MuiFilledInput-root.Mui-error': {
                    border: '1px solid #ff4d4f !important',
                },
            }}
        />
    )
}

export default TextFieldInput;