import { Tab } from "@headlessui/react";

interface TabPanelsProps {
  children: React.ReactNode;
  customClass?: string;
}

function TabPanels({ children, customClass }: TabPanelsProps) {
  return <Tab.Panels className={customClass}> {children} </Tab.Panels>;
}

export default TabPanels;
