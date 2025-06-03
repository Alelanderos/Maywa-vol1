import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Play, TrendingUp, Target, AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";
import { NewSimulationDialog } from "@/components/NewSimulationDialog";
import { RunningSimulations } from "@/components/RunningSimulations";
import { AnimatedLineChart } from './AnimatedLineChart';

interface RunningSimulation {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
}

const Simulations = () => {
  const [runningSimulations, setRunningSimulations] = useState<RunningSimulation[]>([]);

  const handleSimulationStart = (simulation: RunningSimulation) => {
    setRunningSimulations(prev => [...prev, simulation]);
  };

  // Simulate progress updates for running simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setRunningSimulations(prev => 
        prev.map(sim => {
          if (sim.status === 'running' && sim.progress < 100) {
            const newProgress = Math.min(sim.progress + Math.random() * 10, 100);
            return {
              ...sim,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'running'
            };
          }
          return sim;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Simulations</h1>
        </div>
        <NewSimulationDialog onSimulationStart={handleSimulationStart} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimulationCard
          title="Active Simulations"
          value={runningSimulations.filter(sim => sim.status === 'running').length.toString()}
          description="Currently running"
          icon={<Play className="h-6 w-6" />}
          color="bg-blue-100 text-blue-800"
          trend="3 started today"
        />
        <SimulationCard
          title="Completed"
          value={runningSimulations.filter(sim => sim.status === 'completed').length.toString()}
          description="Total completed"
          icon={<CheckCircle className="h-6 w-6" />}
          color="bg-green-100 text-green-800"
          trend="8 this week"
        />
        <SimulationCard
          title="Success Rate"
          value="94%"
          description="Overall success rate"
          icon={<Target className="h-6 w-6" />}
          color="bg-purple-100 text-purple-800"
          trend="+2% from last month"
        />
        <SimulationCard
          title="Avg Duration"
          value="2.4h"
          description="Average completion time"
          icon={<Clock className="h-6 w-6" />}
          color="bg-orange-100 text-orange-800"
          trend="-15min improved"
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RunningSimulations simulations={runningSimulations} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center p-2 bg-red-50 text-red-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span>Simulation "Protein-X" failed validation</span>
              </li>
              <li className="flex items-center p-2 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                <span>High memory usage in "Batch-127"</span>
              </li>
              <li className="flex items-center p-2 bg-blue-50 text-blue-700 rounded-md text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span>New parameters available for testing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              Recent Simulation Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 minutes ago", text: "Simulation 'Nutritional-Analysis-v2' completed successfully", type: "complete" },
                { time: "15 minutes ago", text: "Started batch simulation for 'Ingredient-Stability-Test'", type: "start" },
                { time: "1 hour ago", text: "Generated report for 'Shelf-Life-Prediction' simulation", type: "report" },
                { time: "3 hours ago", text: "Updated parameters for 'Quality-Assessment' model", type: "update" },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    item.type === 'complete' ? 'bg-green-400' :
                    item.type === 'start' ? 'bg-blue-400' :
                    item.type === 'report' ? 'bg-purple-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Simulation Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-500">Total Simulations Run</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-500">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.2/5</div>
                <div className="text-sm text-gray-500">User Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface SimulationCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const SimulationCard = ({ title, value, description, icon, color, trend }: SimulationCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
          {trend && (
            <p className="text-xs text-blue-600 mt-1 font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Simulations;
