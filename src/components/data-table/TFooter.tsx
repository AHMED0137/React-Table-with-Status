import { HeaderGroup, flexRender } from "@tanstack/react-table";

import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@mantine/core";

export interface TFooterProps<TData extends { id: string | number }> {
  footerHeader: HeaderGroup<TData>[];
  message?: string;
  footerStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    thClassName?: React.HtmlHTMLAttributes<"th">["className"];
  };
}

export function TFooter<TData extends { id: string | number }>({
  footerHeader,
  message,
  footerStyleClasses,
}: TFooterProps<TData>) {
  const { thClassName, trClassName } = footerStyleClasses || {};
  return (
    <React.Fragment>
      <tfoot>
        {footerHeader.map((footerGroup) => (
          <tr key={footerGroup.id} className={trClassName}>
            {footerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={thClassName}
                style={{ width: `${header.column.getSize()}px` }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
      {message && <Text component="caption">{message}</Text>}
    </React.Fragment>
  );
}
