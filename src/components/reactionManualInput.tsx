"use client";

import React, { Dispatch, useId, useState } from "react";
import DataTable, { DataTableHeaderAction } from "./dataTable";
import { IconDuplicateOutline, IconDelete, IconPlus, IconEdit3 } from "./icons";
import Modal from "./Modal";
import Label from "./label";
import RadioGroupInput from "./radioGroupInput";
import { countOccurrences, snakeCase } from "@/lib/utils";
import InputGroup from "./inputGroup";
import Input from "./input";
import EmptyBlock from "./emptyBlock";
import Button from "./button";

export type ReactionInfoManual = {
  name: string;
  primer: string;
};

export type PrimerInputs = {
  primer: string;
  customLength: string;
};
interface ReactionManualInputProps {
  items: Array<ReactionInfoManual>;
  setItems: Dispatch<ReactionInfoManual[]>;
}

function ReactionManualInput({
  items = [],
  setItems,
}: ReactionManualInputProps) {
  const primerTypes = ["Universal Primer", "Stored Primer"];
  const [primerModalOpen, setPrimerModalOpen] = useState<boolean>(false);
  const [primerModalEditOpen, setPrimerModalEditOpen] =
    useState<boolean>(false);
  const [primerTypeSelected, setPrimerTypeSelected] = useState(primerTypes[0]);
  const [selectedRow, setSelectedRow] = useState<ReactionInfoManual>({
    name: "",
    primer: "",
  });
  const [primerInput, setPrimerInput] = useState<{
    name: string;
    primer: string;
  }>({ name: "", primer: "" });

  const actions = [
    {
      id: "edit",
      icon: <IconEdit3 className="w-3.5 h-3.5" />,
      display(item: ReactionInfoManual) {
        return true;
      },
      onClick(item: ReactionInfoManual) {
        setPrimerInput(item);
        setPrimerModalEditOpen(true);
      },
      title: "Edit",
    },
    {
      id: "duplicate",
      icon: <IconDuplicateOutline className="w-4 h-4" />,
      display(item: ReactionInfoManual) {
        return true;
      },
      onClick(item: ReactionInfoManual) {
        setItems([
          ...items,
          {
            ...item,
            name: `${item.name} ${items.length + 1}`,
          },
        ]);
      },
      title: "Duplicate Row",
    },
    {
      id: "delete",
      icon: <IconDelete className="w-4 h-4" />,
      display(item: ReactionInfoManual) {
        return true;
      },
      onClick(item: ReactionInfoManual) {
        const idx = items.indexOf(item);
        if (idx > -1) {
          let itemsCopy = items;
          itemsCopy.splice(idx, 1);
          const updater = () => items.filter((elt) => elt !== item);
          setItems(updater());
        }
      },
      title: "Delete",
    },
  ];

  const columns = [
    {
      key: "name",
      title: "Sample Name",
      data: (item: ReactionInfoManual) => item.name,
      display: true,
    },
    {
      key: "primer",
      title: "Primer",
      data: (item: ReactionInfoManual) => item.primer,
      display: true,
    },
  ];

  const headerActions: DataTableHeaderAction<ReactionInfoManual>[] = [
    {
      id: useId(),
      text: "Add",
      size: "sm",
      icon: <IconPlus />,
      display: () => true,
      disabled: () => false,
      execute: () => {
        setPrimerModalOpen(true);
      },
    },
  ];

  const primerInputDataTable = {
    columns: [
      {
        key: "primerInput",
        title: "Primer",
        data: (item: PrimerInputs) => item.primer,
        display: true,
      },
      {
        key: "length",
        title: "Length",
        data: (item: PrimerInputs) => item.customLength,
        display: true,
      },
    ],
    items: [
      {
        primer: "EBV-RP",
        customLength: "20",
        type: "Universal Primer",
      },
      {
        primer: "ERP",
        customLength: "0",
        type: "Universal Primer",
      },
      {
        primer: "MVP-RP",
        customLength: "10",
        type: "Universal Primer",
      },
      {
        primer: "KAN2-FP",
        customLength: "14",
        type: "Universal Primer",
      },
      {
        primer: "EBV",
        customLength: "20",
        type: "Universal Primer",
      },
      {
        primer: "M13-FP",
        customLength: "12",
        type: "Universal Primer",
      },
      {
        primer: "EBV-RPS",
        customLength: "20",
        type: "Stored Primer",
      },
      {
        primer: "ERPs",
        customLength: "0",
        type: "Stored Primer",
      },
      {
        primer: "MVP-RPs",
        customLength: "10",
        type: "Stored Primer",
      },
      {
        primer: "KAN2-FPS",
        customLength: "14",
        type: "Stored Primer",
      },
      {
        primer: "EBVS",
        customLength: "20",
        type: "Stored Primer",
      },
      {
        primer: "M13-FPS",
        customLength: "12",
        type: "Stored Primer",
      },
    ],
  };

  return (
    <div>
      {items.length > 0 ? (
        <DataTable
          items={items}
          itemKey={(item) => item.name}
          columns={columns}
          actions={actions}
          headerActions={headerActions}
          bodyClass="!bg-secondary"
        />
      ) : (
        <EmptyBlock
          title="There is no primer"
          description="Click here to add a primer"
          onClick={() => setPrimerModalOpen(true)}
          className="bg-secondary"
          borderStyle="none"
        />
      )}

      {(primerModalOpen || primerModalEditOpen) && (
        <Modal
          isOpen={primerModalOpen || primerModalEditOpen}
          title="Primer Input"
          modalClass="w-[48rem]"
          onClose={() => {
            setPrimerModalOpen(false);
            setPrimerModalEditOpen(false);
            setPrimerInput({ name: "", primer: "" });
          }}
        >
          <div className="mt-6 mx-2">
            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Sample Name</Label>
                <Input
                  value={primerInput.name}
                  onChange={(e) =>
                    setPrimerInput({ ...primerInput, name: e.target.value })
                  }
                />
              </div>
            </InputGroup>
            <div className="flex flex-col gap-1.5 mb-4 mt-4">
              <Label>Primer Selection</Label>
              <RadioGroupInput
                items={primerTypes}
                label={(item) => item}
                value={(item) => item}
                itemKey={(item) => snakeCase(item)}
                change={setPrimerTypeSelected}
                selected={primerTypeSelected}
              />
            </div>
            <p className="text-sm font-light">
              Click on a row to select a primer
            </p>
            <DataTable
              items={primerInputDataTable.items.filter(
                (item) => item.type === primerTypeSelected
              )}
              itemKey={(item) => snakeCase(item.primer)}
              columns={primerInputDataTable.columns}
              bodyClass="!bg-secondary"
              rowClass="hover:bg-primary-200 active:bg-primary-200 cursor-pointer"
              selectedRowClass="bg-primary-200"
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              onRowSelected={(item) => {
                setPrimerInput({ ...primerInput, primer: item.primer });
              }}
            />
          </div>
          <div className="mt-4 flex justify-end items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPrimerModalOpen(false);
                setPrimerModalEditOpen(false);
                setPrimerInput({ name: "", primer: "" });
              }}
            >
              Cancel
            </Button>
            {primerModalOpen && (
              <Button
                disabled={!primerInput.name || !primerInput.primer}
                onClick={() => {
                  setItems([...items, primerInput]);
                  setPrimerModalOpen(false);
                  setPrimerInput({ name: "", primer: "" });
                }}
              >
                Save
              </Button>
            )}

            {primerModalEditOpen && (
              <Button
                disabled={!primerInput.name || !primerInput.primer}
                onClick={() => {
                  setItems(
                    items.map((item) =>
                      item.primer === primerInput.primer ? primerInput : item
                    )
                  );
                  setPrimerModalEditOpen(false);
                  setPrimerInput({ name: "", primer: "" });
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ReactionManualInput;
