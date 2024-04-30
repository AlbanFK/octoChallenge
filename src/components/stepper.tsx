import { snakeCase } from "@/lib/utils";
import clsx from "clsx";
import { IconCheck } from "./icons";

export interface Step {
  title: string;
  icon?: React.ReactNode;
}
export interface StepperProps {
  steps: Step[];
  currentStepNumber: number;
}

function Stepper({ steps, currentStepNumber }: StepperProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, stepIdx) => (
        <div
          key={snakeCase(step.title)}
          className="flex flex-col items-start  gap-y-2"
        >
          <div className="flex items-center gap-6">
            <div
              className={clsx({
                "h-12 w-12 flex items-center justify-center text-lg rounded-full":
                  true,
                "bg-primary-600 text-white": stepIdx + 1 === currentStepNumber,
                "bg-green-600 text-white": stepIdx + 1 < currentStepNumber,
                "bg-secondary": stepIdx + 1 > currentStepNumber,
              })}
            >
              {stepIdx + 1 < currentStepNumber ? (
                <IconCheck />
              ) : (
                <span>{stepIdx + 1}</span>
              )}
            </div>
            <div className="h-12 flex flex-col justify-between">
              <span className="text-sm text-gray-400 uppercase">{`STEP ${
                stepIdx + 1
              }`}</span>
              <span className="text-medium font-bold">{step.title}</span>
            </div>
          </div>
          {stepIdx + 1 < steps.length && (
            <div
              className={clsx({
                "w-1 h-10  rounded-full ml-5": true,
                "bg-primary-600": stepIdx + 1 === currentStepNumber,
                "bg-green-600 ": stepIdx + 1 < currentStepNumber,
                "bg-slate-300 ": stepIdx + 1 > currentStepNumber,
              })}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
