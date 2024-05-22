import { Container, Stack, Text, Title, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleGoToHomePage = () => {
    navigate("/");
  };
  return (
    <Container h="50vh">
      <Stack align="center" justify="center" h="50vh">
        <Title>404 - Page Not Found</Title>
        <Text>The page you requested could not be found.</Text>
        <Button onClick={handleGoToHomePage}>Go to Home Page</Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
