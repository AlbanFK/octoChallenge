"use client";

import { Dispatch, useId, useState } from "react";
import { IconDelete, IconEdit3, IconPlus } from "./icons";
import DataTable, { DataTableHeaderAction } from "./dataTable";
import EmptyBlock from "./emptyBlock";
import Modal from "./Modal";
import InputGroup from "./inputGroup";
import Label from "./label";
import Input from "./input";
import { snakeCase } from "@/lib/utils";
import Button from "./button";
import RadioGroupInput from "./radioGroupInput";

export interface PrimerCondition {
  code: string;
  primer: string;
  type: string;
  sequence: string;
  concentration: string;
  requiredVolume: number;
  sequencingPrimer: boolean;
  pcrPrimers: boolean;
}

interface PrimerConditionViewProps {
  items: Array<PrimerCondition>;
  setItems: Dispatch<PrimerCondition[]>;
}

function PrimerConditionView({
  items = [],
  setItems,
}: PrimerConditionViewProps) {
  const primerType = [
    {
      title: "Universal",
      description: "Macrogen’s in-house Universal primers",
    },
    {
      title: "Enclosed",
      description: "sending your own primers enclosed in your sample package.",
    },
    {
      title: "Synthesis",
      description: "If you need us to synthesize your own primers.",
    },
    {
      title: "Stored",
      description: "If you have used the same primer in previous orders.",
    },
  ];
  const initialPrimerCondition = {
    code: "",
    primer: "",
    type: primerType[0].title,
    requiredVolume: 0,
    concentration: "",
    sequence: "",
    sequencingPrimer: false,
    pcrPrimers: false,
  };
  const [currentSample, setCurrentSample] = useState<PrimerCondition>(
    initialPrimerCondition
  );

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const actions = [
    {
      id: "edit",
      icon: <IconEdit3 className="w-3.5 h-3.5" />,
      display(item: PrimerCondition) {
        return true;
      },
      onClick(item: PrimerCondition) {
        setCurrentSample(item);
        setEditModalOpen(true);
      },
      title: "Edit",
    },
    {
      id: "delete",
      icon: <IconDelete className="w-4 h-4" />,
      display(item: PrimerCondition) {
        return true;
      },
      onClick(item: PrimerCondition) {
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
      key: "code",
      title: "NO.",
      data: (item: PrimerCondition) => item.code,
      display: true,
    },
    {
      key: "primer",
      title: "Primer",
      data: (item: PrimerCondition) => item.primer,
      display: true,
    },
    {
      key: "type",
      title: "Type",
      data: (item: PrimerCondition) => item.type,
      display: true,
    },
    {
      key: "sequence",
      title: "Sequence",
      data: (item: PrimerCondition) => item.sequence,
      display: true,
    },
    {
      key: "concentration",
      title: "Conc.(ng/ul)",
      data: (item: PrimerCondition) => item.concentration,
      display: true,
    },
    {
      key: "vol",
      title: "Required vol(ul)",
      data: (item: PrimerCondition) => item.requiredVolume,
      display: true,
    },

    {
      key: "sequencingPrimer",
      title: "Sequencing Primer(Y/N)",
      data: (item: PrimerCondition) => (item.sequencingPrimer ? "Yes" : "No"),
      display: true,
    },
    {
      key: "pcrPrimers",
      title: "PCR Primers(Y/N)",
      data: (item: PrimerCondition) => (item.pcrPrimers ? "Yes" : "No"),
      display: true,
    },
  ];

  const headerActions: DataTableHeaderAction<PrimerCondition>[] = [
    {
      id: useId(),
      text: "Add",
      size: "sm",
      icon: <IconPlus />,
      display: () => true,
      disabled: () => false,
      execute: () => {
        setCreateModalOpen(true);
      },
    },
  ];

  return (
    <div>
      {items.length > 0 ? (
        <DataTable
          items={items}
          itemKey={(item) => item.code}
          columns={columns}
          actions={actions}
          headerActions={headerActions}
          bodyClass=""
        />
      ) : (
        <EmptyBlock
          title="There is no primer condition"
          description="Click here to add a primer condition"
          onClick={() => setCreateModalOpen(true)}
          className="bg-background"
          borderStyle="none"
        />
      )}

      {(createModalOpen || editModalOpen) && (
        <Modal
          isOpen={createModalOpen || editModalOpen}
          title="Enter Sample Information"
          modalClass="w-[48rem]"
          onClose={() => {
            setCreateModalOpen(false);
            setEditModalOpen(false);
            setCurrentSample(initialPrimerCondition);
          }}
        >
          <div className="mt-6 mx-2 grid grid-cols-2 gap-4">
            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Primer</Label>
                <Input
                  value={currentSample.primer}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      primer: e.target.value,
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Sequence</Label>
                <Input
                  value={currentSample.sequence}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      sequence: e.target.value,
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Conc.(ng/ul)</Label>
                <Input
                  value={currentSample.concentration}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      concentration: e.target.value,
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Required Vol(ul)</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentSample.requiredVolume}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      requiredVolume: Number(e.target.value),
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Sequencing Primer</Label>
                <RadioGroupInput
                  items={["Yes", "No"]}
                  label={(item) => item}
                  value={(item) => item}
                  itemKey={(item) => snakeCase(item)}
                  change={(val) =>
                    setCurrentSample({
                      ...currentSample,
                      sequencingPrimer: val === "Yes",
                    })
                  }
                  selected={currentSample.sequencingPrimer ? "Yes" : "No"}
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>PCR Primers</Label>
                <RadioGroupInput
                  items={["Yes", "No"]}
                  label={(item) => item}
                  value={(item) => item}
                  itemKey={(item) => snakeCase(item)}
                  change={(val) =>
                    setCurrentSample({
                      ...currentSample,
                      pcrPrimers: val === "Yes",
                    })
                  }
                  selected={currentSample.pcrPrimers ? "Yes" : "No"}
                />
              </div>
            </InputGroup>

            <div className="col-span-2">
              <InputGroup>
                <div className="flex flex-col gap-1.5">
                  <Label>Type</Label>
                  <RadioGroupInput
                    items={primerType}
                    label={(item) => item.title}
                    description={(item) => item.description}
                    value={(item) => item}
                    itemKey={(item) => snakeCase(item.title)}
                    change={(val) => {
                      console.log({ val });

                      setCurrentSample({
                        ...currentSample,
                        type: val.title,
                      });
                    }}
                    selected={
                      primerType.find(
                        (item) => item.title === currentSample.type
                      ) ?? null
                    }
                  />
                </div>
              </InputGroup>
            </div>
          </div>
          <div className="mt-4 flex justify-end items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCreateModalOpen(false);
                setEditModalOpen(false);
                setCurrentSample(initialPrimerCondition);
              }}
            >
              Cancel
            </Button>
            {createModalOpen && (
              <Button
                disabled={false}
                onClick={() => {
                  setItems([
                    ...items,
                    { ...currentSample, code: `${items.length + 1}` },
                  ]);
                  setCreateModalOpen(false);
                  setCurrentSample(initialPrimerCondition);
                }}
              >
                Save
              </Button>
            )}

            {editModalOpen && (
              <Button
                disabled={false}
                onClick={() => {
                  setItems(
                    items.map((item) =>
                      item.code === currentSample.code ? currentSample : item
                    )
                  );
                  setEditModalOpen(false);
                  setCurrentSample(initialPrimerCondition);
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

export default PrimerConditionView;
