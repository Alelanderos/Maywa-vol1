
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlockEditor from "@/components/BlockEditor";
import DocumentTemplates from "@/components/DocumentTemplates";

const ProductView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Vita-Plus Daily Supplement</h1>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Compliant</Badge>
          </div>
          <p className="text-gray-500">Supplement • Updated 3 days ago</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Generate Report</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
        </div>
      </div>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Product Info</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-purple-800">Product Information</h3>
                  <BlockEditor initialBlocks={[
                    { id: "1", type: "text", content: "Vita-Plus is a daily supplement designed to support overall health and wellbeing." },
                    { id: "2", type: "smartField", content: "12345-COF-2023", fieldType: "COFEPRIS Registration Number" },
                    { id: "3", type: "smartField", content: "2024-06-15", fieldType: "Sanitary permit expiration date" },
                    { id: "4", type: "text", content: "Product is manufactured in GMP certified facility." }
                  ]} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4 text-purple-800">Technical Specifications</h3>
                  <BlockEditor initialBlocks={[
                    { id: "5", type: "checklist", content: "pH level tested and within range", checked: true },
                    { id: "6", type: "checklist", content: "Stability testing completed", checked: true },
                    { id: "7", type: "checklist", content: "Micro testing completed", checked: false },
                    { id: "8", type: "smartField", content: "24 months", fieldType: "Shelf life" },
                    { id: "9", type: "text", content: "Store in cool, dry place away from direct sunlight." }
                  ]} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ingredients">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4 text-purple-800">Ingredient List</h3>
                <BlockEditor initialBlocks={[
                  { id: "10", type: "text", content: "Vitamin C (as ascorbic acid)" },
                  { id: "11", type: "text", content: "Vitamin D3 (as cholecalciferol)" },
                  { id: "12", type: "text", content: "Zinc (as zinc citrate)" },
                  { id: "13", type: "text", content: "Magnesium (as magnesium glycinate)" },
                  { id: "14", type: "text", content: "Proprietary herbal blend (echinacea, elderberry, ginger)" }
                ]} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentTemplates />
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 text-purple-800">NOM-051 Compliance Checklist</h3>
              <BlockEditor initialBlocks={[
                { id: "20", type: "checklist", content: "Product name clearly visible on front panel", checked: true },
                { id: "21", type: "checklist", content: "Net content declaration", checked: true },
                { id: "22", type: "checklist", content: "Ingredient list in descending order", checked: true },
                { id: "23", type: "checklist", content: "Nutritional information table follows format", checked: true },
                { id: "24", type: "checklist", content: "Front warning labels for high calories/sugar/sodium/fat", checked: false },
                { id: "25", type: "checklist", content: "Manufacturer information including address", checked: true },
                { id: "26", type: "checklist", content: "Lot identification", checked: true },
                { id: "27", type: "checklist", content: "Expiration date format: DD/MM/YYYY", checked: true },
                { id: "28", type: "checklist", content: "Storage instructions", checked: true },
                { id: "29", type: "checklist", content: "Health claims compliant with regulations", checked: false }
              ]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductView;
