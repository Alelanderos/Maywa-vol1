
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface ComplianceStep {
  id: number;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  percentage: number;
}

interface ComplianceCategory {
  id: string;
  title: string;
  steps: ComplianceStep[];
  overallProgress: number;
}

interface ComplianceDashboardProps {
  categories?: ComplianceCategory[];
}

const defaultCategories: ComplianceCategory[] = [
  {
    id: "nom051",
    title: "NOM-051 Compliance",
    overallProgress: 65,
    steps: [
      { id: 1, title: "Product Registration", status: "completed", percentage: 100 },
      { id: 2, title: "Product Analysis", status: "completed", percentage: 100 },
      { id: 3, title: "Label Design", status: "in-progress", percentage: 60 },
      { id: 4, title: "Document Submission", status: "not-started", percentage: 0 },
      { id: 5, title: "Approval", status: "not-started", percentage: 0 },
    ]
  },
  {
    id: "haccp",
    title: "HACCP Implementation",
    overallProgress: 30,
    steps: [
      { id: 1, title: "Team Assembly", status: "completed", percentage: 100 },
      { id: 2, title: "Product Description", status: "completed", percentage: 100 },
      { id: 3, title: "Identify Hazards", status: "in-progress", percentage: 50 },
      { id: 4, title: "Critical Control Points", status: "not-started", percentage: 0 },
      { id: 5, title: "Monitoring System", status: "not-started", percentage: 0 },
    ]
  },
];

export function ComplianceDashboard({ categories = defaultCategories }: ComplianceDashboardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Compliance Progress</h2>
      
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden">
          <CardHeader className="bg-purple-50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-purple-800">{category.title}</CardTitle>
              <div className="text-sm text-gray-500">
                {category.overallProgress}% Complete
              </div>
            </div>
            <Progress value={category.overallProgress} className="h-2" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex justify-between">
              {category.steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`progress-step ${step.status === 'completed' ? 'completed' : ''} ${step.status === 'in-progress' ? 'active' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="progress-marker">
                      {step.status === 'completed' ? <Check size={16} /> : index + 1}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-xs font-medium">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.percentage}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ComplianceDashboard;
