import { Accordion } from "@mantine/core";
import { ReactNode } from "react";

export type AItem = {
  id: string;
  title: string;
  label: string;
  panel: ReactNode;
  active: boolean;
  Icon?: ReactNode;
  message?: string;
};

type AccordionProps = {
  data: Array<AItem>;
  value?: Array<string>;
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function MainAccordian({ data, value, onChange }: AccordionProps) {
  return (
    <Accordion variant="contained" multiple value={value} onChange={onChange}>
      {data.map((item) => (
        <Accordion.Item key={item.id} value={item.label} >
          <Accordion.Control icon={item.Icon}>
            <div className="flex flex-row">
              <div className="flex-1 text-lg text-Stone-800">{item.label}</div>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <div>
              <div className="mb-2 p-2 text-md font-serif text-neutral-600">
                {item.title}
              </div>
              <div>{item.panel}</div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
