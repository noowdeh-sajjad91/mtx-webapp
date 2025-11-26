"use client"
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

interface DatePickerFieldProps {
   value?: string | Dayjs | null; // Accept both string and Dayjs
    onChange: (date: string) => void;
    label?: string;
    onBlur?: () => void;
    error?: string,
    touched?: boolean,
}
const DatePickerField: React.FC<DatePickerFieldProps> = ({
    value,
    onChange,
    error,
    touched,onBlur
    ,
    label = "Select Date"
}) => {
      const dateValue = value ? dayjs(value) : null;

    const handleDateChange = (date: Dayjs | null) => {
        // Convert Dayjs to ISO string or empty string
        const dateString = date ? date.format('YYYY-MM-DD') : '';
        onChange(dateString);
    };
    //33333333333333333333333333
    // const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(value || null);

    const showError = Boolean(touched && error);
    // React.useEffect(() => {
    //     setSelectedDate(value || null);
    // }, [value]);

    // const handleDateChange = (date: Dayjs | null) => {
    //     setSelectedDate(date);

    //     // Format the date for the parent
    //     const formattedDate = date ? date.format('YYYY-MM-DD') : '';

    //     // Pass both raw date and formatted string to parent
    //     onChange(date, formattedDate);

    //     console.log('Date selected:', {
    //         raw: date,
    //         formatted: formattedDate,
    //         iso: date?.toISOString()
    //     });
    // };


    const filterTextFieldProps = (params: any) => {
        const invalidProps = [
            'sectionListRef',
            'areAllSectionsEmpty',
            'onClick',
            'onBlur',
            'onFocus',
            'onChange',
            'onInput',
            'onKeyDown',
            'onKeyUp',
            'onPaste',
            'color',
            'variant',
            'inputRef',
            'ref',
            'ownerState'
        ];

        const filteredParams = { ...params };

        invalidProps.forEach(prop => {
            delete filteredParams[prop];
        });

        return filteredParams;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date"
                value={dateValue}
                onChange={handleDateChange}
                onClose={onBlur}
                enableAccessibleFieldDOMStructure={false}
                slots={{
                    textField: (params) => (
                        <TextField
                            {...filterTextFieldProps(params)}
                            error={showError}
                            helperText={showError ? error : ""}
                            sx={{ width: "100%" }}
                        />
                    ),
                }}
            />
        </LocalizationProvider>
    )
}

export default DatePickerField;