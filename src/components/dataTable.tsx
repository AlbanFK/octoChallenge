"use client";
import React, { Dispatch, useState } from "react";
import Button, { ButtonSize, ButtonVariants } from "./button";
import clsx from "clsx";

/**
 * A table header action button. Displayed at the top of the table.
 */
export interface DataTableHeaderAction<T> {
  id: string;
  variant?: ButtonVariants;
  size?: ButtonSize;
  disabled(items: T[]): boolean;
  execute(items: T[]): void;
  display(items: T[]): boolean;
  icon?: React.ReactElement;
  text: string;
}

/**
 * An action button. Used in the Action column.
 */
export interface DataTableAction<T> {
  id: string;
  variant?: ButtonVariants;
  size?: ButtonSize;
  disabled?: boolean;
  onClick(item: T): void;
  display(item: T): boolean;
  icon: React.ReactElement;
  text?: string;
  title?: string;
}

/**
 * A data table column structure.
 */
export interface DataTableColumn<TItem, TData = any> {
  display: boolean;
  title: string;
  key: string;
  description?: string;
  data(item: TItem): TData;
  empty?(item: TItem): boolean;
  class?: string;
}

interface DataTableProps<T> {
  headerActions?: DataTableHeaderAction<T>[];
  actions?: DataTableAction<T>[];
  items: T[];
  columns: DataTableColumn<T>[];
  rowClass?: string;
  selectedRowClass?: string;
  selectedRow?: T;
  bodyClass?: string;
  itemKey: (item: T) => string;
  onRowSelected?: (item: T) => void;
  setSelectedRow?: Dispatch<T>;
}
function DataTable({
  headerActions,
  actions,
  items,
  columns,
  rowClass = "",
  selectedRowClass = "",
  bodyClass = "",
  selectedRow,
  setSelectedRow,
  itemKey,
  onRowSelected = () => {},
}: DataTableProps<any>) {
  console.log({ selectedRow });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex  items-center justify-end gap-2">
        {headerActions &&
          headerActions.length > 0 &&
          headerActions.map((action) => {
            if (action.display(items)) {
              return (
                <Button
                  size={action.size ?? "default"}
                  variant={action.variant ?? "default"}
                  key={action.id}
                  disabled={action.disabled(items)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    action.execute(items);
                  }}
                >
                  <div className="flex justify-center items-center gap-2">
                    {action.icon ?? null}
                    {action.text}
                  </div>
                </Button>
              );
            }
          })}
      </div>

      <div className="relative overflow-x-auto w-full">
        <table className="w-full divide-y divide-secondary rounded-md overflow-hidden p-2 shadow">
          <thead className="bg-primary-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="relative w-12 px-6 sm:w-16 sm:px-8 py-4"
                >
                  <div className="flex gap-2 normal-case items-center">
                    <span className="text-sm">{column.title}</span>
                  </div>
                </th>
              ))}
              {actions && (
                <th
                  scope="col"
                  className="relative w-12 px-6 sm:w-16 sm:px-8 py-4 text-left text-sm  cursor-pointer font-semibold"
                >
                  <div className="flex gap-1 normal-case items-center justify-end">
                    <span className="uppercase">Actions</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody
            className={clsx(
              "divide-y divide-primary-200 bg-background",
              bodyClass
            )}
          >
            {items.map((item) => (
              <tr
                key={itemKey(item)}
                className={clsx(
                  rowClass,
                  selectedRow?.primer === item.primer ? selectedRowClass : ""
                )}
                onClick={() => {
                  if (setSelectedRow) {
                    setSelectedRow(item);
                  }
                  onRowSelected(item);
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      column.class,
                      "whitespace-nowrap px-2 pl-8 py-4 text-sm"
                    )}
                  >
                    {column.data(item)}
                  </td>
                ))}
                {actions && (
                  <td className="whitespace-nowrap px-2 py-4 flex gap-2 flex-wrap justify-end pr-8">
                    {actions.map((action) => {
                      if (action.display(item)) {
                        return (
                          <Button
                            title={action?.title ?? ""}
                            key={action.id}
                            size="icon"
                            className="h-4 w-4"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                          >
                            {action.icon}
                          </Button>
                        );
                      }
                    })}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
