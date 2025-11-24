import { Checkbox, FormControlLabel } from "@mui/material"


interface ICheckBoxField {
    lable?: string
}
const CheckBoxField: React.FC<ICheckBoxField> = ({ lable }) => {
    return (
        <>
            <FormControlLabel
                label={lable}
                control={
                    <Checkbox
                        defaultChecked
                    />
                }
                sx={(theme) => ({
                    "& .MuiFormControlLabel-label": {
                        color: theme.palette.lightGray.main, // 👈 label color from theme
                        fontSize: "14px",                   // optional
                        fontWeight: 500,                    // optional
                    },
                })}
            />

        </>
    )
}

export default CheckBoxField