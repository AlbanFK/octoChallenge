import React, { useState } from "react";
import InputGroup from "./inputGroup";
import Input from "./input";
import Label from "./label";
import Select from "./select";
import { snakeCase } from "@/lib/utils";
import RadioGroupInput from "./radioGroupInput";
import Button from "./button";
import { IconArrowRight } from "./icons";

const sampleType = ["Plasmid", "PCR Product", "Premix"];
const addService = ["Purification"];
const productSize = ["Over 600bp", "Less 600bp"];
const tubeType = ["tube", "96- well plate"];
const runType = [
  {
    title: "Express",
    description: "24 hours",
  },
  {
    title: "Regular",
    description: "3~5 business day",
  },
];

function BasicInfoForm() {
  const [sampleTypeSelected, setSampleTypeSelected] = useState(null);
  const [addServiceSelected, setAddServiceSelected] = useState(null);
  const [tubeTypeSelected, setTubeTypeSelected] = useState(tubeType[0]);
  const [productSizeSelected, setProductSizeSelected] = useState(
    productSize[0]
  );
  const [runTypeSelected, setRunTypeSelected] = useState(runType[0]);
  return (
    <>
      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Sample Type</Label>
          <Select
            items={sampleType}
            label={(item) => item}
            value={(item) => item}
            itemKey={(item) => snakeCase(item)}
            change={setSampleTypeSelected}
            selected={sampleTypeSelected}
          />
        </div>
      </InputGroup>
      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Additionally Required Service</Label>
          <Select
            items={addService}
            label={(item) => item}
            value={(item) => item}
            itemKey={(item) => snakeCase(item)}
            change={setAddServiceSelected}
            selected={addServiceSelected}
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Product Size(bp)</Label>
          <RadioGroupInput
            items={productSize}
            label={(item) => item}
            value={(item) => item}
            itemKey={(item) => snakeCase(item)}
            change={setProductSizeSelected}
            selected={productSizeSelected}
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Tube Type(bp)</Label>
          <RadioGroupInput
            items={tubeType}
            label={(item) => item}
            value={(item) => item}
            itemKey={(item) => snakeCase(item)}
            change={setTubeTypeSelected}
            selected={tubeTypeSelected}
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Run Type</Label>
          <RadioGroupInput
            items={runType}
            label={(item) => item.title}
            description={(item) => item.description}
            value={(item) => item}
            itemKey={(item) => snakeCase(item.title)}
            change={setRunTypeSelected}
            selected={runTypeSelected}
          />
        </div>
      </InputGroup>
    </>
  );
}

export default BasicInfoForm;
