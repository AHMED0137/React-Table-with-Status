import { Checkbox } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "./DataTable2";

export const getColumns = () => {
  const columns: Array<ColumnDef<User, unknown>> = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="grid place-items-center">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            indeterminate={table.getIsSomeRowsSelected()}
            styles={{ input: { cursor: "pointer" } }}
          />
        </div>
      ),
      size: 1,
    },
    {
      accessorKey: "description",
      header: "Descriptions",
      footer: () => {"Ahmad"},
      size: 95,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      footer: () => null,
      size: 100,
    },
    {
      accessorKey: "otp",
      header: "OTP",
      footer: () => null,
      size: 1,
    },
    {
      accessorKey: "sportsCanada",
      header: "Sports Canada",
      footer: () => null,
      size: 1,
    },
    {
      accessorKey: "nso",
      header: "NSO",
      footer: () => null,
      size: 1,
    },
    {
      accessorKey: "otherSources",
      header: "Other",
      footer: () => null,
      size: 1,
    },

    {
      accessorKey: "total",
      header: "total",
      footer: () => null,
      size: 1,
    },
    {
      header: "Action",
      size: 1,
    },
  ];

  return columns;
};
