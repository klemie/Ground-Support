import * as React from "react";
import { Stepper, Step, StepButton, StepLabel } from "@mui/material";

const steps = ["Telemetry View", "Module View"];

interface VerticalStepperProps {
  currentStep?: String;
}

const VerticalStepper: React.FC<VerticalStepperProps> = (props: VerticalStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
