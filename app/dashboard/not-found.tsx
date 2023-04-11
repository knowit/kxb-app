import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-lg">
      <Card.Content>
        <Card.Header>404</Card.Header>
        <Card.Description>Not found</Card.Description>
      </Card.Content>
      <Card.Footer>
        <LinkButton href="/dashboard">Take me back</LinkButton>
      </Card.Footer>
    </Card>
  );
}
