import { TabNavigation } from "@/components/tab-navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow space-y-3">
      <TabNavigation
        path="/dashboard/profile"
        items={[
          { text: "Profile", slug: "" },
          { text: "Salary", slug: "salary" },
          { text: "Settings", slug: "settings" }
        ]}
      />
      <Card>
        <CardContent className="px-8 py-6">{children}</CardContent>
      </Card>
    </div>
  );
}
