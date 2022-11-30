import { ActionIcon, Group } from "@mantine/core";
import { Copy, Edit, Trash } from "tabler-icons-react";

import { CellContext } from "@tanstack/react-table";
import { FC } from "react";
import { TableData } from "./DataTable2";

const actionButtons = {
  view: ({ onClick, rowId }: ViewActionsProps) => (
    <Group>
      <ActionIcon
        onClick={() => {
          onClick?.("editClick", rowId);
        }}
        size={"lg"}
        radius="xl"
      >
        <Edit />
      </ActionIcon>
      <ActionIcon
        onClick={() => {
          onClick?.("copyClick", rowId);
        }}
        size={"lg"}
        radius="xl"
      >
        <Copy />
      </ActionIcon>
      <ActionIcon
        onClick={() => onClick?.("deleteClick", rowId)}
        color="red"
        size={"lg"}
        radius="xl"
      >
        <Trash />
      </ActionIcon>
    </Group>
  ),
};

type ViewActionsProps = {
  actionType: "view";
  rowId: string | number;
  key: string;
  onClick?: (
    action: "saveClick" | "cancelClick" | "deleteClick" | "editClick" | "copyClick",
    rowIndex: string | number
  ) => void;
};


export type ActionButtonsProps = ViewActionsProps ;

export function ActionButtons({
  actionType,
  rowId,
  ...rest
}: ActionButtonsProps) {
  const Buttons = actionButtons[actionType] as FC<ActionButtonsProps>;
  return <Buttons actionType={actionType} rowId={rowId} {...rest} />;
}

export const ControlActions = <T extends { id: string | number }>({
  cell,
  row,
  table,
}: CellContext<T, unknown>) => {
  const tableState = table.options.meta?.getState();

  // row is editing
  const isRowEditing = (tableState: TableData<T>) => {
    const { changedRows } = tableState;
    const index = changedRows.findIndex(
      (changedRow) => changedRow.rowId === row.original.id
    );
    return index >= 0 && changedRows[index].isEditing;
  };

  const isEditting = isRowEditing(tableState!);

  return (
    <ActionButtons
      key={cell.column.id + row.index}
      actionType={isEditting ? "view" : "view"}
      onClick={(action, rowId) => {
        if (action === "editClick")
          table.options.meta?.setRowEditing(rowId, true);
        else if (action === "copyClick") {
          table?.options?.meta?.copyRow(rowId);
        }
        else if (action === "deleteClick") {
          table.options.meta?.deleteRow(rowId);
        }
      }}
      rowId={row.original.id}
    />
  );
};
