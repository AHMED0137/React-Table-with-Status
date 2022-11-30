import { ReactNode } from "react";
import { Tabs } from "@mantine/core";

export type AItem = {
  id: string;
  title: string;
  label: string;
  panel: ReactNode;
  active: boolean;
  Icon?: ReactNode;
  message?: string;
};

type TabsProps = {
  data: Array<AItem>;
  value?: Array<string>;
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function RequestTabs({ data }: TabsProps) {
  return (
    <Tabs color="teal" defaultValue={data[0].label}>
      <Tabs.List>
        {data.map((item) => (
          <Tabs.Tab key={item.id} value={item.label} icon={item.Icon}>
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {data.map((item) => (
        <Tabs.Panel key={item.id} value={item.label}>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="m-2 flex-1 text-lg text-orange-500">
                {item.title}
              </div>
              <div className="m-2 text-lg text-orange-500">{item.message}</div>
            </div>

            <div>{item.panel}</div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

//export const RequestedTabsInDrawer = withDrawer(RequestTabs);
