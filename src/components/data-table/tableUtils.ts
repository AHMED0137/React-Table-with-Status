import { Id, WithStatus } from "./types";

export function getTableDataWithStatus<T>(data: Array<T>): Array<WithStatus<T>> {
  return data.map((row) => ({
    ...row,
    status: "initial",
  }));
}


// export function isRowEditable<T extends { id: Id }>(
//   tableData: TableData<T>,
//   rowId: Id
// ) {

// }

// checks if the row with given index is in edit mode
export function isTableRowInEditMode<T extends { id: Id }>(
  tableData: Array<WithStatus<T>>,
  rowId: Id
) {
  const [isEdit]=tableData.map((item) => {
    if(item.id === rowId && item.status==="Edited")
  {
    return true;
  }
  else{
    return false;
  }
  });
  console.log(isEdit);
  return isEdit ;
}


// set table row in edit mode
export function setTableRowInEditMode<T extends { id: Id }>(
  tableData: Array<WithStatus<T>>,
  rowId: Id,
  mode: boolean
) {
  const updatedData=tableData.map((item) => {
    if(item.id === rowId)
  {
    item.status="Edited";
  }
  return item;
  });
  console.log(updatedData);
  return updatedData;
}

// copy table row
export function copyTableRow<T extends { id: Id }>(
  tableData: Array<WithStatus<T>>,
  rowId: Id
) {
  const [copiedrow]=tableData.filter((item) => item.id === rowId)
  // console.log("copiedrow", copiedrow)
  const index=tableData.indexOf(copiedrow)+1;
  // console.log("my index", index)
  tableData.splice(index,0,copiedrow)
  const newData = [...tableData];
  // console.log(newData);
  return newData;
}

// Delete selected row
export function deleteTableRow<T extends { id: Id }>(
  tableData: Array<WithStatus<T>>,
  rowId: Id
) {
  const updatedData=tableData.map((item) => {
    if(item.id === rowId)
  {
    item.status="deleted";
  }
  return item;
  });
  const finalData=updatedData.filter((row)=>row.id!==rowId)
  console.log(finalData);
  return finalData;
}


// cancelEditting cell within a given row
export function cancelRowEdit<T extends { id: Id }>(
  tableData: Array<WithStatus<T>>,
  rowId: Id
) {
  const data = [...tableData];

  return data;
}

// // cancelEditting cell within a given row
// export function cancelRowEdit<T extends { id: Id }>(
//   tableData: TableData<T>,
//   rowId: Id
// ) {
//   const data = [...tableData.data];
//   const changedRows =
//     tableData.changedRows.filter((item) => item.updatedRow?.id !== rowId) ?? [];
//   return { data , changedRows };
// }