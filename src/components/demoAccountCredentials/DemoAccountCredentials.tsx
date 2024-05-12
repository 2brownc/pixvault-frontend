import { Stack, Table } from "@mantine/core";

export function DemoAccountCredentials() {
  return (
    <Stack h="100%" align="stretch" justify="center">
      <Table>
        <Table.Tr>
          <Table.Td>Username</Table.Td>
          <Table.Td>{import.meta.env.VITE_DEMO_EMAIL}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Password</Table.Td>
          <Table.Td>{import.meta.env.VITE_DEMO_PASS}</Table.Td>
        </Table.Tr>
      </Table>
    </Stack>
  );
}
