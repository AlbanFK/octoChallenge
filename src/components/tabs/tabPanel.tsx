import { Tab } from "@headlessui/react";

interface TabPanelProp extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function TabPanel({ children, className }: TabPanelProp) {
  return <Tab.Panel className={className}>{children}</Tab.Panel>;
}

export default TabPanel;
