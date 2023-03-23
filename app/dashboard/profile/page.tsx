import { Button } from "@/components/ui/button";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <p>coming...</p>
        <Button className="mls-auto" variant="destructive">
          Delete me
        </Button>
      </div>
    </div>
  );
}
