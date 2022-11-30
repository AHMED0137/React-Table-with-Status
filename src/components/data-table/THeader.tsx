import { HeaderGroup, flexRender } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface THeaderProps<TData extends { id: string | number }> {
  header: HeaderGroup<TData>[];
  headerStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    thClassName?: React.HtmlHTMLAttributes<"th">["className"];
  };
}

export function THeader<TData extends { id: string | number }>({
  header,
  headerStyleClasses,
}: THeaderProps<TData>) {
  const { trClassName, thClassName } = headerStyleClasses || {};
  return (
    <thead>
      {header.map((headerGroup) => (
        <tr key={headerGroup.id} className={trClassName}>
          {headerGroup.headers.map((header) => (
            <th
              className={
                thClassName ??
                "border-0 border-b-2 border-solid py-4 px-2 text-left text-gray-500"
              }
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: `${header.column.getSize()}px` }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
