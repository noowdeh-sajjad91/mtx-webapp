"use client";

import React from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Stepper,
  Step,
  styled,
} from "@mui/material";

type TimerPlayerProps = {
  /** Total target value (e.g. steps or meters) */
  totalDistance?: number; // default 3000

  /** Number of segments in the stepper (e.g. 4) */
  steps?: number;

  /** Is the counter currently running? (controlled from parent) */
  running: boolean;

  /** Setter from parent to control running state */
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;

  /** Called when count reaches totalDistance */
  onComplete?: () => void;

  /** How fast to increment (ms per +1) – smaller = faster */
  speedMsPerUnit?: number;
};

const TimerPlayer: React.FC<TimerPlayerProps> = ({
  totalDistance = 3000,
  steps = 4,
  running,
  setRunning,
  onComplete,
  speedMsPerUnit = 600, // 0.1s per step → ~300s to reach 3000
}) => {
  const [count, setCount] = React.useState(0);

  const isFinished = count >= totalDistance;

  // Start / pause
  const toggle = () => {
    // if finished and click again → restart from 0
    if (isFinished) {
      setCount(0);
      setRunning(true);
    } else {
      setRunning((prev) => !prev);
    }
  };

  // Optional reset function if you want to call it
  const reset = () => {
    setCount(0);
    setRunning(false);
  };

  // Counter effect: increase 1 → totalDistance while running
  React.useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= totalDistance) {
          clearInterval(interval);
          setRunning(false);
          onComplete?.();
          return totalDistance;
        }
        return prev + 1;
      });
    }, speedMsPerUnit);

    return () => clearInterval(interval);
  }, [running, totalDistance, speedMsPerUnit, setRunning, onComplete]);

  // Progress percentage for bar + stepper
  const progressPercent =
    totalDistance > 0 ? (count / totalDistance) * 100 : 0;

  // Stepper: 0..steps
  const totalSteps = steps;
  const rawStep =
    totalSteps > 0 ? (progressPercent / 100) * totalSteps : 0;

  // visible: 0 at start, then 1..steps
  const currentStep =
    !running && count === 0
      ? 0
      : totalSteps === 0
      ? 0
      : Math.min(totalSteps, Math.max(1, Math.ceil(rawStep)));

  return (
    <Box
      sx={{
        width: "70%",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {/* Button: Start / Pause / Restart */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <ButtonDayily
          variant="contained"
          size="small"
          sx={{
            color: running
              ? "rgba(210, 54, 81, 1)"
              : "#000000ff",
          }}
          onClick={toggle}
        >
          {running
            ? "Pause"
            : isFinished
            ? "Restart"
            : "Start Walking"}
        </ButtonDayily>
      </Box>

      {/* Progress bar */}
      <Box sx={{ position: "relative", width: "100%", mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={(theme) => ({
            height: 8,
            borderRadius: 999,
            backgroundColor: theme.palette.grey[300],
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              backgroundColor: theme.palette.cyan.main,
              transition: "transform 0.3s linear",
            },
          })}
        />

        {/* Stepper on top of the bar */}
        {totalSteps > 0 && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Stepper
              alternativeLabel
              activeStep={currentStep}
              sx={{
                width: "100%",
                "& .MuiStep-root": { p: 0 },
                "& .MuiStepConnector-line": { display: "none" },
                "& .MuiStepLabel-root": { p: 0 },
                "& .MuiStepIcon-root": {
                  color: "transparent",
                  border: "2px solid rgba(0,0,0,0.12)",
                  borderRadius: "50%",
                  fontSize: "0.75rem",
                },
                "& .Mui-active .MuiStepIcon-root": {
                  borderColor: "cyan",
                },
              }}
            >
              {Array.from({ length: totalSteps }).map((_, i) => (
                <Step key={i} />
              ))}
            </Stepper>
          </Box>
        )}
      </Box>

      {/* Bottom text: counter / totalDistance */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Typography variant="xsmall">
          {count} / {totalDistance}
        </Typography>
      </Box>
    </Box>
  );
};

const ButtonDayily = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.red.main,
  width: "100%",
  height: "36px",
  borderRadius: "8px",
  textTransform: "capitalize",
}));

export default TimerPlayer;
