import * as React from "react";
import { Stepper, Step, StepButton, StepLabel } from "@mui/material";

const steps = ["Telemetry View", "Module View", "Another View"];

interface VerticalStepperProps {
  currentStep?: String;
}

const VerticalStepper: React.FC<VerticalStepperProps> = (props: VerticalStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStep = (step: number) => () => {
    // check step number and handle view change here
    setActiveStep(step);
  };

  // const totalSteps = () => {
  //   return steps.length;
  // };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };

  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };

  return (
    <>
      <Stepper
        nonLinear
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
          >
            <StepButton
              color="inherit"
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default VerticalStepper;
