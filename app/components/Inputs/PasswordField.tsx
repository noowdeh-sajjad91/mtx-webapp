
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
interface IPasswordField {
    label: string;
    fullWidth?: boolean;
    name: string;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PasswordField: React.FC<IPasswordField> = ({ label, fullWidth, name, value, onChange, touched, error }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const showError = Boolean(touched && error);
    return (
        <FormControl
            fullWidth
            variant="filled"
            error={showError}  //
            sx={(theme) => ({
                '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: theme.palette.grayPlaceholder.main,
                },
                '& .MuiFilledInput-root': {
                    borderRadius: '12px',     // 👈 rounded corners
                    backgroundColor: '#f5f5f5',
                    border: showError ? '1px solid #ff4d4f' : '1px solid transparent',

                },
                '& .MuiFilledInput-root.Mui-error': {
                    border: '1px solid #ff4d4f !important',
                },

            })}
        >
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
                fullWidth
                id={name}
                value={value}
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                disableUnderline
                error={showError}
                // helperText={showError ? error : ""}
                endAdornment={
                    <InputAdornment position="end" >
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />

            {showError && (
                <FormHelperText>{error}</FormHelperText>
            )}
        </FormControl>
    )
}

export default PasswordField;