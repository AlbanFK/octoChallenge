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

export interface SampleInfos {
  code: string;
  name: string;
  reactionCount: number;
  concentration: string;
  plateName: string;
  well: string;
  productSize: string;
  targetSize: string;
}

interface SampleInfosViewProps {
  items: Array<SampleInfos>;
  setItems: Dispatch<SampleInfos[]>;
}

function SampleInfosView({ items = [], setItems }: SampleInfosViewProps) {
  const productSize = ["Over 600bp", "Less 600bp"];

  const initialSampleInfos = {
    code: "",
    name: "",
    reactionCount: 0,
    concentration: "",
    plateName: "",
    well: "",
    productSize: productSize[0],
    targetSize: "",
  };
  const [currentSample, setCurrentSample] =
    useState<SampleInfos>(initialSampleInfos);

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const actions = [
    {
      id: "edit",
      icon: <IconEdit3 className="w-3.5 h-3.5" />,
      display(item: SampleInfos) {
        return true;
      },
      onClick(item: SampleInfos) {
        setCurrentSample(item);
        setEditModalOpen(true);
      },
      title: "Edit",
    },
    {
      id: "delete",
      icon: <IconDelete className="w-4 h-4" />,
      display(item: SampleInfos) {
        return true;
      },
      onClick(item: SampleInfos) {
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
      data: (item: SampleInfos) => item.code,
      display: true,
    },
    {
      key: "name",
      title: "Sample Name",
      data: (item: SampleInfos) => item.name,
      display: true,
    },
    {
      key: "count",
      title: "Reaction Count",
      data: (item: SampleInfos) => item.reactionCount,
      display: true,
    },
    {
      key: "concentration",
      title: "Conc.(ng/ul)",
      data: (item: SampleInfos) => item.concentration,
      display: true,
    },
    {
      key: "plateName",
      title: "Plate Name",
      data: (item: SampleInfos) => item.plateName,
      display: true,
    },
    {
      key: "well",
      title: "Well",
      data: (item: SampleInfos) => item.well,
      display: true,
    },
    {
      key: "productSize",
      title: "Product Size",
      data: (item: SampleInfos) => item.productSize,
      display: true,
    },
    {
      key: "targetSize",
      title: "Target Size",
      data: (item: SampleInfos) => item.targetSize,
      display: true,
    },
  ];

  const headerActions: DataTableHeaderAction<SampleInfos>[] = [
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
          itemKey={(item) => item.name}
          columns={columns}
          actions={actions}
          headerActions={headerActions}
          bodyClass=""
        />
      ) : (
        <EmptyBlock
          title="There is no sample"
          description="Click here to add a sample"
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
            setCurrentSample(initialSampleInfos);
          }}
        >
          <div className="mt-6 mx-2 grid grid-cols-2 gap-4">
            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Sample Name</Label>
                <Input
                  value={currentSample.name}
                  onChange={(e) =>
                    setCurrentSample({ ...currentSample, name: e.target.value })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Reaction count</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentSample.reactionCount}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      reactionCount: Number(e.target.value),
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
                <Label>Plate Name</Label>
                <Input
                  value={currentSample.plateName}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      plateName: e.target.value,
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Well</Label>
                <Input
                  value={currentSample.well}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      well: e.target.value,
                    })
                  }
                />
              </div>
            </InputGroup>

            <InputGroup>
              <div className="flex flex-col gap-1.5">
                <Label>Target Size(bp)</Label>
                <Input
                  value={currentSample.targetSize}
                  onChange={(e) =>
                    setCurrentSample({
                      ...currentSample,
                      targetSize: e.target.value,
                    })
                  }
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
                  change={(size) =>
                    setCurrentSample({
                      ...currentSample,
                      productSize: size,
                    })
                  }
                  selected={currentSample.productSize}
                />
              </div>
            </InputGroup>
          </div>
          <div className="mt-4 flex justify-end items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCreateModalOpen(false);
                setEditModalOpen(false);
                setCurrentSample(initialSampleInfos);
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
                  setCurrentSample(initialSampleInfos);
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
                  setCurrentSample(initialSampleInfos);
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

export default SampleInfosView;
