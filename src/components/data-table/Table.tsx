/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable- react-hooks/exhaustive-deps

import {
  CellContext,
  ColumnDef,
  OnChangeFn,
  RowSelectionState
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  cancelRowEdit, copyTableRow, deleteTableRow,
  getTableDataWithStatus,
  isTableRowInEditMode,
  setTableRowInEditMode
} from "./tableUtils";
import { Id, RowState, TableData, WithStatus } from "./types";

import { TableUI } from "./TableUI";
import { TBodyProps } from "./TBody";
import { TFooterProps } from "./TFooter";
import { THeaderProps } from "./THeader";
import { useTable } from "./useTable";

export type DataTableProps<T extends { id: Id }> = {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;
  search?: string;
  footer?: boolean;
  pagination?: boolean;
  RowUI?: React.JSXElementConstructor<CellContext<T, unknown>>;
  onRowUpdate?: (rows: RowState<T>[]) => void;
  onRowDelete?: (rowId: string | number) => void;
  onRowCopy ?: (rowId: string | number) => void;
  rowsSelected?: RowSelectionState;
  onRowsSelected?: OnChangeFn<RowSelectionState>;
  className?: string;
  bodyStyleClasses?: TBodyProps<T>["bodyStyleClasses"];
  footerStyleClasses?: TFooterProps<T>["footerStyleClasses"];
  headerStyleClasses?: THeaderProps<T>["headerStyleClasses"];
};

// function useSkipper() {
//   const shouldSkipRef = React.useRef(true);
//   const shouldSkip = shouldSkipRef.current;
//   // Wrap a function with this to skip a pagination reset temporarily
//   const skip = React.useCallback(() => {
//     shouldSkipRef.current = false;
//   }, []);

//   React.useEffect(() => {
//     shouldSkipRef.current = true;
//   });
//   return [shouldSkip, skip] as const;
// }

export function DataTable<T extends { id: Id }>({
  data: initialTableData,
  columns,
  search,
  className,
  footer = false,
  pagination = false,
  RowUI,
  onRowDelete,
  onRowCopy,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  rowsSelected,
  onRowsSelected,
}: DataTableProps<T>) {

  // console.log(initialTableData);
  // with status
  const [data, setData] = useState<Array<WithStatus<T>>>(
    getTableDataWithStatus(initialTableData)
  );


  // without status
  const [tableData, setTableData] = useState<TableData<T>>({
    data: initialTableData,
    changedRows: [],
  });

 
  const isRowEditting = (rowId: Id) => {
    return isTableRowInEditMode(data, rowId);
  };

  // sets the given row in edit mode
  const setRowEditing = (rowId: Id, mode: boolean) => {
    setData(setTableRowInEditMode(data, rowId, mode));
  };

// copy selected row
function copyRow(rowId: Id) {
    setData(copyTableRow(data, rowId));
    if (onRowCopy) onRowCopy(rowId);
    // console.log("table data after copy",data);
  };

// delete selected row
  function deleteRow(rowId: Id) {
    setData(deleteTableRow(data, rowId));
    if (onRowDelete) onRowDelete(rowId);
    // console.log("data after row delete",data);
  }

  // cancelEditting cell within a given row
  const cancelEdit = (rowId: Id) => {
    setData(cancelRowEdit(data, rowId));
  };

  const table = useTable({
    data: data,
    columns: columns,
    RowUI,
    pagination,
    search,
    onRowsSelected,
    rowsSelected,

    meta: {
      isRowEditting,
      copyRow,
      setRowEditing,
      deleteRow,
      cancelEdit,
      setState: setTableData,
      getState: () => tableData,
    },
  });

  return (
    <TableUI
      table={table}
      pagination={pagination}
      footer={footer}
      headerStyleClasses={headerStyleClasses}
      bodyStyleClasses={bodyStyleClasses}
      footerStyleClasses={footerStyleClasses}
      className={className}
    />
  );
}

export default DataTable;
