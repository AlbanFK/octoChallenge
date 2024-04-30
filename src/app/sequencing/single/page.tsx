"use client";
import BasicInfoForm from "@/components/basicInfoForm";
import BillingInfosView from "@/components/billingInfosView";
import Button from "@/components/button";
import CompleteView from "@/components/completeView";
import { IconArrowLeft, IconArrowRight, IconInfo } from "@/components/icons";
import Stepper, { Step } from "@/components/stepper";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const stepsInit = [
    {
      title: "Basic Infos",
      icon: <IconInfo />,
    },
    {
      title: "Billing Infos",
      icon: <IconInfo />,
    },
    {
      title: "Complete",
    },
  ] as Step[];

  const [steps, setSteps] = useState<Step[]>(stepsInit);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const onNext = (e: any) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const onPrevious = (e: any) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/4 bg-background dark:bg-background-foreground flex items-center justify-center">
        <Stepper steps={steps} currentStepNumber={currentStep} />
      </div>
      <div className="w-3/4 bg-secondary">
        <div className="h-full flex flex-col justify-between ">
          <div className="grow overflow-y-auto p-8">
            <div className={currentStep === 1 ? "" : "hidden"}>
              <div className="flex gap-2 items-center mb-8">
                <span className="h-9 w-9 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                  {steps[currentStep - 1].icon}
                </span>
                <span className="text-2xl font-semibold">
                  {" "}
                  {steps[currentStep - 1].title}{" "}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <BasicInfoForm />
              </div>
            </div>

            <div className={currentStep === 2 ? "" : "hidden"}>
              <div className="flex gap-2 items-center mb-8">
                <span className="h-9 w-9 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                  {steps[currentStep - 1].icon}
                </span>
                <span className="text-2xl font-semibold">
                  {" "}
                  {steps[currentStep - 1].title}{" "}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <BillingInfosView />
              </div>
            </div>

            <div className={currentStep === 3 ? "h-full" : "hidden"}>
              <div className="flex items-center justify-center h-full">
                <CompleteView />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 flex-none p-8 relative">
            {currentStep !== 3 && (
              <Link
                className="h-10 px-4 py-2 rounded-lg bg-primary-100 text-primary hover:bg-primary-100/90 absolute top-8 left-8"
                href="/"
              >
                Cancel
              </Link>
            )}

            {currentStep > 1 && currentStep !== 3 && (
              <Button onClick={onPrevious} variant="outline">
                <div className="flex gap-2 items-center justify-center">
                  <IconArrowLeft /> Previous
                </div>
              </Button>
            )}
            {currentStep === 2 ? (
              <Button onClick={onNext}>Submit</Button>
            ) : currentStep === 3 ? (
              <Link
                className="group rounded-lg text-primary-900 bg-primary-100 border border-transparent px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                href="/"
              >
                Go to Home
              </Link>
            ) : (
              <Button onClick={onNext}>
                <div className="flex gap-2 items-center justify-center">
                  Next <IconArrowRight />
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
