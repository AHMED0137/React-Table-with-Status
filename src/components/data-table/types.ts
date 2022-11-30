import { RowData } from "@tanstack/react-table";

export type Id = string | number;
// export type Status = "deleted" | "updated" | "new";
export type Status = "initial" | "new" | "Edited" | "deleted";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    getState: () => TableData<TData>;
    isRowEditting: (rowId: Id) => boolean;
    setRowEditing: (rowId: Id, mode: boolean) => void;
    copyRow: (rowId: Id) => void;
    setState: React.Dispatch<React.SetStateAction<TableData<TData>>>;
    deleteRow: (rowId: Id) => void;
    cancelEdit: (rowId: Id) => void;
  }
}

export type RowState<T extends RowData> = {
  rowId?: string | number;
  isEditing?: boolean;
  isCopy?:boolean;
  rowStatus?: Status;
  isChanged?: boolean; // TODO: this would be deleted when rowStatus is working fine
  updatedRow?: T;
};

export type TableData<TData extends RowData> = {
  data: Array<TData>;
  changedRows: Array<RowState<TData>>;
};
export type WithStatus<T> = T & { status: Status };