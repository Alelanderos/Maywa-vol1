
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface RunningSimulation {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
}

interface RunningSimulationsProps {
  simulations: RunningSimulation[];
}

export function RunningSimulations({ simulations = [] }: RunningSimulationsProps) {
  if (!simulations || simulations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-500" />
            Running Simulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No simulations running</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-blue-500" />
          Running Simulations ({simulations.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {simulations.map((simulation) => (
          <div key={simulation.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {simulation.status === 'running' && <Play className="h-4 w-4 text-blue-500" />}
                {simulation.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {simulation.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-500" />}
                <span className="font-medium">{simulation.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{simulation.startTime.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{simulation.progress}%</span>
              </div>
              <Progress value={simulation.progress} className="h-2" />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Status: {simulation.status}</span>
              <span>Started: {simulation.startTime.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
