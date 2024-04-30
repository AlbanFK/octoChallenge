import { Tab } from "@headlessui/react";

interface TabGroupProps {
  children: React.ReactNode;
  customClass?: string;
}

function TabGroup({ children, customClass }: TabGroupProps) {
  return (
    <div className={`w-full px-2 sm:px-0 ${customClass} `}>
      <Tab.Group>{children}</Tab.Group>
    </div>
  );
}

export default TabGroup;
