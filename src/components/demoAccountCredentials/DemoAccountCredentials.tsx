import { Stack, Table, Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

export function DemoAccountCredentials() {
  const usernameCopy = useClipboard({ timeout: 500 });
  const passwordCopy = useClipboard({ timeout: 500 });

  const handleUsernameCopy = () =>
    usernameCopy.copy(import.meta.env.VITE_DEMO_EMAIL);
  const handlePasswordCopy = () =>
    passwordCopy.copy(import.meta.env.VITE_DEMO_PASS);

  return (
    <Stack h="100%" align="stretch" justify="center">
      <Table>
        <Table.Tr>
          <Table.Td>Username</Table.Td>
          <Table.Td>
            <Button variant="subtle" onClick={handleUsernameCopy}>
              {import.meta.env.VITE_DEMO_EMAIL}
            </Button>
          </Table.Td>
          <Table.Td>
            {usernameCopy.copied ? "Copied" : "Click to copy"}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Password</Table.Td>
          <Table.Td>
            <Button variant="subtle" onClick={handlePasswordCopy}>
              {import.meta.env.VITE_DEMO_PASS}
            </Button>
          </Table.Td>
          <Table.Td>
            {passwordCopy.copied ? "Copied" : "Click to copy"}
          </Table.Td>
        </Table.Tr>
      </Table>
    </Stack>
  );
}
