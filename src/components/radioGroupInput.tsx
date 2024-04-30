"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { SelectProps } from "./select";
import { IconCheck } from "./icons";

interface RadioGroupProps extends SelectProps<any> {
  /**
   * A function that for each item in the list returns the item's description.
   * @type {(item: T) => string}
   */
  description?: (item: any) => string;

  verticalAlign?: boolean;

  optionsContainerClass?: string;
}

function RadioGroupInput({
  items,
  label,
  itemKey,
  value,
  description = (item) => "",
  disable = () => false,
  change,
  disabled = false,
  selected = null,
  verticalAlign = false,
  optionsContainerClass = "",
}: RadioGroupProps) {
  return (
    // <div className="w-full px-4 py-16">
    <div className=" w-full ">
      <RadioGroup value={selected} onChange={change} disabled={disabled}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div
          className={` ${
            verticalAlign ? "space-y-2" : "flex gap-2 flex-wrap items-center"
          } ${optionsContainerClass}`}
        >
          {items.map((item) => (
            <RadioGroup.Option
              key={itemKey(item)}
              value={value(item)}
              disabled={disable(item)}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-primary-300"
                    : ""
                }
                ${checked ? "bg-primary-200" : "bg-white"}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between gap-1.5">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-primary-500" : "text-gray-900"
                          }`}
                        >
                          {label(item)}
                        </RadioGroup.Label>
                        {}
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-primary-400" : "text-gray-500"
                          }`}
                        >
                          <span>{description(item)}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && verticalAlign && (
                      <div className="shrink-0 text-white h-6 w-6 rounded-full bg-primary-400 flex items-center justify-center">
                        <IconCheck />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
    // </div>
  );
}

export default RadioGroupInput;
