import { Accordion } from "@mantine/core";
import { ReactNode } from "react";

export type ProgramItem = {
  id: string;
  label: string;
  panel: ReactNode;
  active: boolean;
  message?: string;
};

type AccordionProps = {
  data: Array<ProgramItem>;
  value?: Array<string>;
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ProgramAcordian({ data, value, onChange }: AccordionProps) {
  return (
    <Accordion variant="contained" multiple value={value} onChange={onChange} >
      {data.map((item) => (
        <Accordion.Item key={item.id} value={item.label} >
          <Accordion.Control>
            <div className="flex flex-row ">
              <div className="flex-1 text-md text-neutral-500">{item.label}</div>
              {item.message && (
                <div className="text-lg font-semibold text-neutral-500">
                  {item.message}
                </div>
              )}
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <div>
              <div>{item.panel}</div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
