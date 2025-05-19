
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComplianceDashboard from "@/components/ComplianceDashboard";
import { BookOpen, FileCheck, Clipboard, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">New Product</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Products"
          value="8"
          description="Total registered products"
          icon={<BookOpen className="h-6 w-6" />}
          color="bg-purple-100 text-purple-800"
        />
        <DashboardCard
          title="Documents"
          value="24"
          description="Regulatory documents"
          icon={<FileCheck className="h-6 w-6" />}
          color="bg-blue-100 text-blue-800"
        />
        <DashboardCard
          title="Ingredients"
          value="46"
          description="Registered ingredients"
          icon={<Clipboard className="h-6 w-6" />}
          color="bg-green-100 text-green-800"
        />
        <DashboardCard
          title="Upcoming"
          value="3"
          description="Tasks due this week"
          icon={<Calendar className="h-6 w-6" />}
          color="bg-yellow-100 text-yellow-800"
        />
      </div>
      
      <div className="mt-8">
        <ComplianceDashboard />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center p-2 bg-red-50 text-red-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span>Nutritional label missing energy value</span>
              </li>
              <li className="flex items-center p-2 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                <span>Sanitary permit expiring in 30 days</span>
              </li>
              <li className="flex items-center p-2 bg-purple-50 text-purple-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                <span>HACCP verification pending</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "Today, 10:30 AM", text: "Updated product 'Vital Supplement' ingredients" },
                { time: "Yesterday", text: "Generated NOM-051 document for 'Skin Repair Cream'" },
                { time: "2 days ago", text: "Added new ingredient 'Hyaluronic Acid' to database" },
                { time: "1 week ago", text: "Completed HACCP protocol for 'Protein Blend'" },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard = ({ title, value, description, icon, color }: DashboardCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
