
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  documentType: string;
  fields: string[];
}

interface DocumentTemplatesProps {
  templates?: DocumentTemplate[];
  onSelectTemplate?: (template: DocumentTemplate) => void;
}

const defaultTemplates: DocumentTemplate[] = [
  {
    id: "nom051",
    title: "NOM-051 Compliance Document",
    description: "Official Mexican Standard for product labeling and nutritional information.",
    documentType: "Regulatory",
    fields: ["Product Name", "Nutritional Facts", "Ingredients", "Net Content", "Manufacturer Information"]
  },
  {
    id: "haccp",
    title: "HACCP Protocol Document",
    description: "Hazard Analysis and Critical Control Points protocol for food safety.",
    documentType: "Quality",
    fields: ["Product Description", "Flow Diagram", "Hazard Analysis", "Critical Control Points", "Monitoring Procedures"]
  },
  {
    id: "cofepris",
    title: "COFEPRIS Sanitary Registration",
    description: "Federal Commission for Protection against Sanitary Risk documentation.",
    documentType: "Registration",
    fields: ["Product Information", "Manufacturer Details", "Formulation", "Stability Studies", "Labels"]
  },
  {
    id: "quality",
    title: "Quality Management System",
    description: "Quality management plan following ISO 9001 guidelines.",
    documentType: "Quality",
    fields: ["Policy", "Objectives", "Procedures", "Records", "Responsibility Matrix"]
  }
];

export function DocumentTemplates({ templates = defaultTemplates, onSelectTemplate }: DocumentTemplatesProps) {
  const handleSelectTemplate = (template: DocumentTemplate) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Document Templates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-2 mr-3">
                    <FileCheck className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <CardDescription>{template.documentType}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-2">
                {template.fields.map((field) => (
                  <span 
                    key={field} 
                    className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => handleSelectTemplate(template)}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DocumentTemplates;
