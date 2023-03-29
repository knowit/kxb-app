import { TabNavigation } from "@/components/tab-navigation";
import { Card } from "@/components/ui/card";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <TabNavigation
        path="/dashboard/profile"
        items={[
          { text: "Profile", slug: "" },
          { text: "Salary", slug: "salary" },
          { text: "Settings", slug: "settings" }
        ]}
      />
      <Card>
        <Card.Content className="px-8 py-6">{children}</Card.Content>
      </Card>
    </div>
  );
}
