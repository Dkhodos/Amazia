import React from "react"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import styled from "@emotion/styled";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface Props{
    step: number
    total?: number
    logs: boolean[]
    onStepClicked: (step: number) => void
}

function getSteps(total: number): number[]{
  return Array(total).fill(0).reduce((arr) => {arr.push(arr.length + 1); return arr}, [])
}

export const Steps:React.FC<Props> = ({step, total = 10, logs,onStepClicked}) => {
    return (
        <StyledStepper nonLinear activeStep={step - 1}>
          {getSteps(total).map((index: number) => (
            <StyledStep key={index} completed={step > index}>
              <StepButton color="inherit" icon={isIcon(step, index, logs) ? <StepIcon index={index} logs={logs} step={step}/> : undefined}/>
            </StyledStep>
          ))}
        </StyledStepper>
    )
}

const isIcon = (step: number,index: number, logs: boolean[]) => step > index && (typeof logs[index - 1] === "boolean");

const StepIcon = ({logs, index, step}:{logs: boolean[], index: number, step: number}) => {
  if(logs[index - 1]){
    return <CompletedIcon/> 
  }

  if(!logs[index - 1]){
    return <FailedIcon/>
  }

  return null;
}


const CompletedIcon = styled(CheckCircleRoundedIcon)`
  fill: darkgreen;
  height: 24px !important;
  width: 24px !important;
`;

const FailedIcon = styled(ErrorOutlineRoundedIcon)`
  fill: red;
  height: 24px !important;
  width: 24px !important;
`;

const StyledStepper = styled(Stepper)`
  margin: 20px 10px;

  @media only screen and (max-width: 300px) {
    display: none;
  }
`

const StyledStep = styled(Step)`
  pointer-events: "none";

  @media only screen and (max-width: 550px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`