import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

type typeItems = {
    title: string,
    value: string,
    titleCode?: string,
    numericCode?: string
}
interface ISelectField {
    label?: string,
    items: typeItems[],
    value?: string,
    error?: string,
    name:string,
    touched?: boolean,
     onBlur?: () => void,
    onChange?: (value: string) => void
}
const SelectField: React.FC<ISelectField> = ({ label, items, value, onChange, error, touched,name ,onBlur}) => {
    // console.log('items',items)
    const [selectValue, setSelectValue] = React.useState<string>(value || '');
    const showError = Boolean(touched && error);

    // Update internal state when external value changes
    React.useEffect(() => {
        setSelectValue(value || '');
    }, [value]);

    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        const newValue = event.target.value;
        // console.log('Selected value (string):', newValue);

        setSelectValue(newValue);


        onChange?.(newValue);
    };

     const handleBlur = () => {
        onBlur?.();
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={`demo-simple-select${label}`}
                value={selectValue}
                name={name}
                label={label}
                onChange={handleChangeSelect}
                onBlur={handleBlur}
                error={showError}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: showError ? "#ff4d4f" : "1px solid transparent"
                    }
                }}
            >
                {
                    items && items?.map((item, i) => (
                        <MenuItem key={i} value={item.value.toString()} >  {item.title}{item?.titleCode ? ` (${item.titleCode})` : ''}</MenuItem>
                    ))
                }

            </Select>
            {
                showError ?
                    (
                        <FormHelperText sx={{ color: '#ff4d4f' }}>
                            {error}
                        </FormHelperText>
                    )
                    : ""
            }

        </FormControl >
    )
}

export default SelectField