import { Row, flexRender } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx } from "@mantine/core";

export interface TBodyProps<TData extends { id: string | number }> {
  rows: Row<TData>[];
  bodyStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    tdClassName?: React.HtmlHTMLAttributes<"td">["className"];
  };
}

export function TBody<TData extends { id: string | number }>({
  rows,
  bodyStyleClasses,
}: TBodyProps<TData>) {
  const { tdClassName, trClassName } = bodyStyleClasses || {};

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className={clsx(
            `${trClassName} ??
            border-0 border-b-2 border-solid border-slate-200 even:bg-slate-100`
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={
                (tdClassName ?? "p-2") +
                (row.getIsSelected() ? " bg-orange-50" : "")
              }
              key={cell.id}
              style={{
                width: `${cell.column.getSize()}px`,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
