"use client"
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface DatePickerFieldProps {
    value?: Dayjs | null;
    onChange: (date: Dayjs | null, formattedDate: string) => void;
    label?: string;
}
const DatePickerField: React.FC<DatePickerFieldProps> = ({
    value,
    onChange,
    label = "Select Date"
}) => {
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(value || null);
     React.useEffect(() => {
        setSelectedDate(value || null);
    }, [value]);

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);

        // Format the date for the parent
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';

        // Pass both raw date and formatted string to parent
        onChange(date, formattedDate);

        console.log('Date selected:', {
            raw: date,
            formatted: formattedDate,
            iso: date?.toISOString()
        });
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                <DatePicker label="date"
                    sx={{ width: "100%" }}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default DatePickerField;