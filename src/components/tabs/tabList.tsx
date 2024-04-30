import { Tab } from "@headlessui/react";
import clsx from "clsx";

interface TabListProps {
  items: string[];
  containerClass?: string;
  tabClass?: string;
}

function TabList({ items, containerClass, tabClass }: TabListProps) {
  return (
    <Tab.List
      className={clsx(
        "flex space-x-1 rounded-xl bg-primary-100 p-1.5",
        containerClass
      )}
    >
      {items.map((item) => (
        <Tab
          key={item}
          className={({ selected }) =>
            clsx(
              " rounded-lg px-3 py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-1",
              selected
                ? "bg-primary-400 text-white shadow"
                : "text-primary-400 hover:bg-primary-200 hover:text-primary",
              tabClass
            )
          }
        >
          {item}
        </Tab>
      ))}
    </Tab.List>
  );
}

export default TabList;
