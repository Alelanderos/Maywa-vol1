
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Beaker, Leaf, FlaskConical, Clock } from "lucide-react";

interface EnvironmentalVariable {
  name: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export function EnvironmentalVariables() {
  const variables: EnvironmentalVariable[] = [
    {
      name: "Temperature",
      value: 25,
      unit: "°C",
      icon: <Thermometer className="h-5 w-5" />,
      color: "text-red-600"
    },
    {
      name: "pH Level",
      value: 7.2,
      unit: "",
      icon: <Droplets className="h-5 w-5" />,
      color: "text-blue-600"
    },
    {
      name: "Biomasa Inicial",
      value: 0.5,
      unit: "g/L",
      icon: <Leaf className="h-5 w-5" />,
      color: "text-green-600"
    },
    {
      name: "Sustrato Inicial",
      value: 2.0,
      unit: "g/L",
      icon: <Beaker className="h-5 w-5" />,
      color: "text-purple-600"
    },
    {
      name: "Nitrogeno Inicial",
      value: 1.2,
      unit: "g/L",
      icon: <FlaskConical className="h-5 w-5" />,
      color: "text-orange-600"
    },
    {
      name: "Duration",
      value: 24,
      unit: "hours",
      icon: <Clock className="h-5 w-5" />,
      color: "text-gray-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-6 w-6 text-blue-600" />
          Environmental Variables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className={`${variable.color} mr-3`}>
                {variable.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">{variable.name}</div>
                <div className="text-lg font-bold text-gray-900">
                  {variable.value} {variable.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
