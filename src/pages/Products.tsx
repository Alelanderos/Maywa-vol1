
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  type: string;
  complianceStatus: "Compliant" | "In Progress" | "Non-Compliant";
  updatedAt: string;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Vita-Plus Daily Supplement",
    type: "Supplement",
    complianceStatus: "Compliant",
    updatedAt: "2023-05-15"
  },
  {
    id: "2",
    name: "Collagen Repair Cream",
    type: "Cosmetic",
    complianceStatus: "In Progress",
    updatedAt: "2023-05-10"
  },
  {
    id: "3",
    name: "Protein Blend Formula",
    type: "Supplement",
    complianceStatus: "Compliant",
    updatedAt: "2023-04-28"
  },
  {
    id: "4",
    name: "Hydrating Face Serum",
    type: "Cosmetic",
    complianceStatus: "Non-Compliant",
    updatedAt: "2023-05-18"
  },
  {
    id: "5",
    name: "Probiotic Daily Blend",
    type: "Supplement",
    complianceStatus: "In Progress",
    updatedAt: "2023-05-12"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Product["complianceStatus"]) => {
    switch (status) {
      case "Compliant":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Compliant</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case "Non-Compliant":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Non-Compliant</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Product</Button>
      </div>
      
      <Card>
        <CardHeader className="border-b bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <div className="w-72">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Compliance Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{getStatusBadge(product.complianceStatus)}</TableCell>
                  <TableCell>{product.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-900 hover:bg-purple-50">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-900 hover:bg-purple-50">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No products found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
