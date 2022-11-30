import { Id } from "./types";
import { Accordion as MAccordion } from "@mantine/core";
import { TableUIProps } from "./TableUI";
import { flexRender } from "@tanstack/react-table";

export function TableAccordian<T extends { id: Id }>({
  table,
  className,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  footer,
  pagination,
}: TableUIProps<T>) {
  return (
    <MAccordion variant="contained" multiple>
      {table.getRowModel().rows.map((row) => (
        <MAccordion.Item
          key={row.original.id}
          value={row.getVisibleCells()[0].id}
        >
          <div className={"ml-2 mr-4 flex flex-row items-center"}>
            {flexRender(
              row.getAllCells()[0].column.columnDef.cell,
              row.getAllCells()[0].getContext()
            )}
            <MAccordion.Control>
              <div className="flex flex-1 flex-row items-center">
                <span className="ml-4 text-left text-sm italic text-gray-400">
                  {`${row.getVisibleCells()[1].column.columnDef.header} `}
                </span>
                <span className="ml-2 text-ellipsis text-left text-sm font-semibold text-orange-500">
                  {row.getVisibleCells()[1].getValue() as string}
                </span>
              </div>
            </MAccordion.Control>
          </div>

          <MAccordion.Panel>
            <div className="mb-2 bg-white p-2">
              {row.getVisibleCells().map((cell, index) =>
                index > 0 ? (
                  <div
                    className="grid grid-cols-2 place-items-start border-0 border-b-2  border-solid border-gray-100 p-4"
                    key={cell.id + cell.row.id}
                  >
                    <span className="text-left text-sm font-semibold text-gray-400">
                      {`${
                        cell.column.columnDef.id ?? cell.column.columnDef.header
                      } `}
                    </span>
                    <span className="text-ellipsis border-0 border-b-2 text-left text-sm text-gray-400">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </MAccordion.Panel>
        </MAccordion.Item>
      ))}
    </MAccordion>
  );
}
