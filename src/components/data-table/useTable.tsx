import {
  CellContext,
  ColumnDef,
  FilterFn, getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel, OnChangeFn,
  RowSelectionState,
  TableMeta, useReactTable
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";
import { useMemo } from "react";
import { Id } from "./types";

interface TableProps<T extends { id: Id }> {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;
  RowUI?: React.JSXElementConstructor<CellContext<T, unknown>>;
  search?: string;
  pagination?: boolean;
  meta?: TableMeta<T> | undefined;
  rowsSelected?: RowSelectionState;
  onRowsSelected?: OnChangeFn<RowSelectionState>;
}

export function useTable<T extends { id: Id }>({
  data,
  columns,
  RowUI,
  search,
  pagination,
  meta,
  rowsSelected,
  onRowsSelected,
}: TableProps<T>) {
  // default Row layout

  const defaultRowUI = () => {
    return {
      cell: (props: CellContext<T, unknown>) =>
        RowUI ? <RowUI {...props} /> : props.cell.getValue(),
    };
  };

  const enablePagination = () => {
    // console.log(pagination);
    return pagination ? { pageSize: 10, pageIndex: 0 } : undefined;
  };

  const globalFilterFn: FilterFn<T> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  /////// Table Hook Section //////////////////////////////////

  const table = useReactTable<T>({
    data: useMemo(() => data, [data]),
    columns: useMemo(() => columns, [columns]),
    defaultColumn: defaultRowUI(),
    state: {
      globalFilter: search,
      rowSelection: rowsSelected,
    },
    initialState: {
      pagination: enablePagination(),
    },
    onRowSelectionChange: onRowsSelected,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: globalFilterFn,
    manualPagination: !pagination,
    meta,
    debugTable: true,
  });

  return table;
}
