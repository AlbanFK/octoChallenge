"use client";
import Button from "@/components/button";
import DataTable from "@/components/dataTable";
import { IconDuplicateOutline, IconEdit3 } from "@/components/icons";
import Input from "@/components/input";
import Label from "@/components/label";
import RadioGroupInput from "@/components/radioGroupInput";
import Select from "@/components/select";
import SequencingCard from "@/components/sequencingCard";
import Stepper, { Step } from "@/components/stepper";
import Tabs from "@/components/tabs";
import { snakeCase } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

type Sample = {
  name: string;
  count: number;
  concentration: string;
  plateName: string;
  productSize: string;
  TargetSize: string;
};

export default function Home() {
  const [selected, setSelected] = useState(null);

  const sample = [
    {
      name: "A",
      count: 2,
      concentration: "6g/mol",
      plateName: "First Sample",
      productSize: "Less then 600bp",
      TargetSize: "500bp",
    },
    {
      name: "B",
      count: 8,
      concentration: "15g/mol",
      plateName: "second Sample",
      productSize: "Less then 500bp",
      TargetSize: "200bp",
    },
    {
      name: "C",
      count: 1,
      concentration: "6g/mol",
      plateName: "C Sample",
      productSize: "Less then 100bp",
      TargetSize: "50bp",
    },
    {
      name: "D",
      count: 3,
      concentration: "4,2g/mol",
      plateName: "Decimal Sample",
      productSize: "More then 100bp",
      TargetSize: "250bp",
    },
    {
      name: "E",
      count: 5,
      concentration: "2g/mol",
      plateName: "one Sample",
      productSize: "Less then 800bp",
      TargetSize: "950bp",
    },
    {
      name: "F",
      count: 2,
      concentration: "7g/mol",
      plateName: "Last Sample",
      productSize: "Less then 300bp",
      TargetSize: "250bp",
    },
  ] as Sample[];

  const columns = [
    {
      key: "name",
      title: "Name",
      data: (item: Sample) => item.name,
      display: true,
    },
    {
      key: "count",
      title: "Count",
      data: (item: Sample) => item.count,
      display: true,
    },
    {
      key: "concentration",
      title: "Concentration",
      data: (item: Sample) => item.concentration,
      display: true,
    },
    {
      key: "platName",
      title: "Plat Name",
      data: (item: Sample) => item.plateName,
      display: true,
    },
    {
      key: "productSize",
      title: "product size",
      data: (item: Sample) => item.productSize,
      display: true,
    },
    {
      key: "TargetSize",
      title: "Target size",
      data: (item: Sample) => item.TargetSize,
      display: true,
    },
  ];

  const actions = [
    {
      id: "edit",
      icon: <IconEdit3 className="w-3.5 h-3.5" />,
      display(item: Sample) {
        return true;
      },
      onClick(item: Sample) {},
      title: "Edit",
    },
    {
      id: "duplicate",
      icon: <IconDuplicateOutline className="w-4 h-4" />,
      display(item: Sample) {
        return true;
      },
      onClick(item: Sample) {},
      title: "Duplicate Row",
    },
  ];

  const steps = [
    {
      title: "Basic Infos",
    },
    {
      title: "Billing Infos",
    },
  ] as Step[];

  const seqs = [
    {
      title: "Standard Sequencing",
      link: "/sequencing/standard",
      description: "Our standard sequencing",
    },
    {
      title: "1 Primer / 1 Plate",
      link: "sequencing/single",
      description: "single primer sequencing",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10 bg-background">
      <h1 className="text-3xl font-bold">Start by choosing your sequencing</h1>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 gap-4 lg:text-left">
        {seqs.map((seq) => (
          <SequencingCard key={snakeCase(seq.title)} seq={seq} />
        ))}
      </div>
    </main>
  );
}
