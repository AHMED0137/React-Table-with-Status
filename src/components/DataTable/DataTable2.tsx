import { Button, Input } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import React, { useState } from "react";

import { max } from "lodash";
import { DataTable } from "../data-table";
import { RowState } from "../data-table/types";
import { SimpleRow } from "./SimpleRow";
import { getColumns } from "./TableSchema";

/* eslint-disable react-hooks/exhaustive-deps */

export type User = {
  id: number;
  description: string;
  notes: string;
  otp: string;
  sportsCanada: string;
  nso: string;
  otherSources: string;
  total: string;
};

export type TableData<TData extends { id: string | number }> = {
  data: Array<TData>;
  changedRows: Array<RowState<TData>>;
};

// table propes
interface TableProps {
  tableData:Array<User>;
}

export function Table({tableData}:TableProps) {
  const [search, setSearchText] = useState<string>();
  const [data, setData] = useState<Array<User>>(tableData);
  const [selectedRows, setSelectedRows] = useState({});

  function handleOnClick() {
    const newRow: User = {
      id: (max(data.map((item) => item.id)) ?? 0) + 1,
      description: "",
      sportsCanada: "",
      otp: "",
      nso: "",
      notes: "",
      otherSources: "",
      total: "",
    };
    const newData = [...data, newRow];
    console.log(newData);
    setData(newData);
  }
  
  const headerStyleClasses = {
    trClassName: "text-gray-500 bg-orange-200",
    thClassName:
      "border-0 border-b-2 border-l-2 border-solid border-slate-100 py-2 px-2 text-left text-xs ",
  };
  const bodyStyleClasses = {
    tdClassName: "text-xs",
    trClassName: "even:bg-slate-100 text-left text-slate-600 text-xs",
  };

  return (
    <div className="p-2">
      <div className="flex flex-row items-center space-x-9">
        <Input
          icon={<IconSearch />}
          placeholder="type to search any column"
          className="mb-4 mt-4 w-[60%]"
          color="orange"
          size="xs"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.currentTarget.value)
          }
        />
        <Button
          leftIcon={<IconPlus size={14} stroke={6} />}
          size="xs"
          onClick={handleOnClick}
          color="orange"
        >
          Item
        </Button>
      </div>
      <div className="overflow-auto bg-slate-50">
        <DataTable
          data={data}
          columns={getColumns()}
          RowUI={SimpleRow}
          search={search}
          className="bottom-2 w-full border-collapse"
          bodyStyleClasses={bodyStyleClasses}
          headerStyleClasses={headerStyleClasses}
          rowsSelected={selectedRows}
          onRowsSelected={setSelectedRows}
        />
      </div>
    </div>
  );
}
