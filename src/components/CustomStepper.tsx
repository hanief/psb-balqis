import { Stepper } from "react-form-stepper";

const CustomStepper = ({activeStep, steps}) => {
  return <Stepper activeStep={activeStep} steps={steps} stepClassName="bg-balqis"/>
};

export default CustomStepper;