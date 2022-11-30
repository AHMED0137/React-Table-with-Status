import { TBody, TBodyProps } from "./TBody";
import { TFooter, TFooterProps } from "./TFooter";
import { THeader, THeaderProps } from "./THeader";

import { Table as MTable } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Table } from "@tanstack/react-table";
import { TableAccordian } from "./table-accordian";
import TPagination from "./TPagination";

type Id = string | number;

export type TableUIProps<T extends { id: Id }> = {
  table: Table<T>;
  className?: string;
  bodyStyleClasses?: TBodyProps<T>["bodyStyleClasses"];
  footerStyleClasses?: TFooterProps<T>["footerStyleClasses"];
  headerStyleClasses?: THeaderProps<T>["headerStyleClasses"];
  footer?: boolean;
  pagination?: boolean;
};

export function TableUI<T extends { id: Id }>({
  table,
  className,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  footer,
  pagination,
}: TableUIProps<T>) {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return largeScreen ? (
    <>
      <MTable className={className ?? "w-full border-collapse"}>
        <THeader
          header={table.getHeaderGroups()}
          headerStyleClasses={headerStyleClasses}
        />
        <TBody
          rows={table.getRowModel().rows}
          bodyStyleClasses={bodyStyleClasses}
        />
        {footer && (
          <TFooter
            footerHeader={table.getFooterGroups()}
            message={`Displaying ${table.getRowModel().rows.length} rows of ${
              table.options.meta?.getState().data.length
            } rows`}
            footerStyleClasses={footerStyleClasses}
          />
        )}
      </MTable>

      {pagination && (
        <TPagination
          onChange={(page) => table.setPageIndex(page - 1)}
          onPageSizeChange={table.setPageSize}
          page={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
        />
      )}
    </>
  ) : (
    <TableAccordian table={table} />
  );
}
