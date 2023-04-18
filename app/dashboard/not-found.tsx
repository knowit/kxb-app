import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-lg">
      <CardContent>
        <CardHeader>404</CardHeader>
        <CardDescription>Not found</CardDescription>
      </CardContent>
      <CardFooter>
        <LinkButton href="/dashboard">Take me back</LinkButton>
      </CardFooter>
    </Card>
  );
}
