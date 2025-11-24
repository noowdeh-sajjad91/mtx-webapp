import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    onChange?: (value: string) => void
}
const SelectField: React.FC<ISelectField> = ({ label, items,value, onChange  }) => {
    // console.log('items',items)
 const [selectValue, setSelectValue] = React.useState<string>(value || '');

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

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={`demo-simple-select${label}`}
                value={selectValue}
                label={label}
                onChange={handleChangeSelect}
            >
                {
                   items && items?.map((item,i) => (
                        <MenuItem key={i} value={ item.value.toString()} >  {item.title}{item?.titleCode ? ` (${item.titleCode})` : ''}</MenuItem>
                    ))
                }

            </Select>
        </FormControl>
    )
}

export default SelectField