import { NumberInput, Pagination, Select, Text } from "@mantine/core";

import { Group } from "@mantine/core";
import { useState } from "react";

interface TPaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function TPagination({
  page,
  total,
  onChange,
  onPageSizeChange,
}: TPaginationProps) {
  const [goTopage, setGoToPage] = useState<number | undefined>();
  const [pageSize, setPageSize] = useState<string | null>("5");

  return (
    <Group position="right" mt={10}>
      <Pagination
        page={page}
        total={total}
        onChange={handlePagination}
        size="xs"
      />

      <Text>{"Go to page num"}</Text>
      <NumberInput
        value={goTopage}
        onChange={handlePageChange}
        max={total}
        min={1}
        size="xs"
      />

      <Text>{"Rows"}</Text>
      <Select
        searchable
        value={pageSize}
        nothingFound="No options"
        data={["5", "10", "15", "20"]}
        onChange={handlePageSizeChange}
        size="xs"
      />
      <Text>{"page"}</Text>
    </Group>
  );

  // Keep Event Handlers at the bottom of the component markup

  function handlePageChange(page: number) {
    if (page > 0 && page <= total) {
      onChange(page);
      setGoToPage(page);
    }
  }

  function handlePagination(pager: number) {
    if (pager > 0 && pager <= total) {
      onChange(pager);
      setGoToPage(undefined);
    }
  }

  function handlePageSizeChange(pageSize: string) {
    if (pageSize) {
      onPageSizeChange(parseInt(pageSize, 10));
      setPageSize(pageSize);
    }
  }
}

export default TPagination;
