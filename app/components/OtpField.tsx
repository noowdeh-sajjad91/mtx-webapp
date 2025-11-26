"use client";

import React from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
    length?: number;                        // number of boxes, default 6
    value: string;
    onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange }) => {
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

    const valueArray = React.useMemo(
        () => value.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length),
        [value, length]
    );

    const handleChange = (index: number, char: string) => {
        const normalized = char.replace(/\D/g, ""); // only digits
        if (!normalized) return;

        const newValueArray = [...valueArray];
        newValueArray[index] = normalized[0];
        const newValue = newValueArray.join("").slice(0, length);

        onChange(newValue);

        // focus next
        if (index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newValueArray = [...valueArray];

            if (newValueArray[index]) {
                // clear current
                newValueArray[index] = "";
                onChange(newValueArray.join("").slice(0, length));
            } else if (index > 0) {
                // move back and clear prev
                inputsRef.current[index - 1]?.focus();
                newValueArray[index - 1] = "";
                onChange(newValueArray.join("").slice(0, length));
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!paste) return;

        const newValue = paste.slice(0, length);
        onChange(newValue);
        // focus last filled input
        const lastIndex = Math.min(newValue.length - 1, length - 1);
        if (lastIndex >= 0) {
            inputsRef.current[lastIndex]?.focus();
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    variant="outlined"
                    value={valueArray[index] ?? ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined} // paste only on first box
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                        style: {
                            textAlign: "center",
                            fontSize: "20px",
                            padding: "10px 0",
                            // width: "40px",
                        },
                    }}
                    sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            textAlign: "center",
                        },
                        "& input": {
                            width:"100%",
                            textAlign: "center", // 👈 center text correctly
                        },
                    }}
                />
            ))}
        </Box>
    );
};

export default OtpInput;
