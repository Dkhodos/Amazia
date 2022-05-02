import React from "react"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

interface Props{
    step: number
    total?: number
}

function getSteps(total: number): number[]{
  return Array(total).fill(0).reduce((arr) => {arr.push(arr.length + 1); return arr}, [])
}

export const Steps:React.FC<Props> = ({step, total = 10}) => {
    return (
        <Stepper nonLinear activeStep={step - 1}>
          {getSteps(total).map((index: number) => (
            <Step key={index} completed={step > index} >
              <StepButton color="inherit"/>
            </Step>
          ))}
        </Stepper>
    )
}