
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SimulationData {
  name: string;
  temperature: number;
  pH: number;
  sustrato: number;
  nitrogeno: number;
  biomasa: number;
  time: number;
}

interface RunningSimulation {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
}

interface NewSimulationDialogProps {
  onSimulationStart: (simulation: RunningSimulation) => void;
}

const chartData = [
  { time: 0, temperature: 20, biomasa: 0.0 },
  { time: 1, temperature: 25, biomasa: 0.1 },
  { time: 2, temperature: 30, biomasa: 0.2 },
  { time: 3, temperature: 35, biomasa: 0.3 },
  { time: 4, temperature: 40, biomasa: 0.4 },
  { time: 5, temperature: 45, biomasa: 0.5 },
];

const chartConfig = {
  temperature: {
    label: "Temperatura (°C)",
    color: "#3b82f6",
  },
  biomasa: {
    label: "Biomasa Inicial",
    color: "#ef4444",
  },

};

export function NewSimulationDialog({ onSimulationStart }: NewSimulationDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<SimulationData>({
    defaultValues: {
      name: "",
      temperature: 25,
      pH: 7,
      sustrato: 0,
      biomasa: 0,
      nitrogeno: 0,
      time: 24,
    },
  });

  const onSubmit = (data: SimulationData) => {
    console.log("Starting simulation with data:", data);
    
    // Create a new running simulation
    const newSimulation: RunningSimulation = {
      id: `sim-${Date.now()}`,
      name: data.name || `Simulation-${Date.now()}`,
      status: 'running',
      progress: 0,
      startTime: new Date(),
    };
    
    // Pass the simulation back to parent
    onSimulationStart(newSimulation);
    
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">New Simulation</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Simulation</DialogTitle>
          <DialogDescription>
            Configure parameters for your new simulation and preview the expected results.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Simulation Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter simulation name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="biomasa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biomasa Inicial </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="1.0" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sustrato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sustrato Inicial </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="1.0" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nitrogeno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nitrogeno Inicial </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="1.0" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />      
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperatura (°C)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="25" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                

                <FormField
                  control={form.control}
                  name="pH"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>pH </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="7" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duracion (horas)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="60" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Start Simulation
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Expected Results Preview</h3>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="biomasa" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    yAxisId="temp"
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="var(--color-temperature)" 
                    strokeWidth={2}
                    name="Temperature"
                  />
                  <Line 
                    yAxisId="biomasa"
                    type="monotone" 
                    dataKey="biomasa" 
                    stroke="var(--color-biomasa)" 
                    strokeWidth={2}
                    name="Biomasa"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Estimated Duration</div>
                <div className="text-2xl font-bold text-blue-600">2.4h</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">Success Rate</div>
                <div className="text-2xl font-bold text-green-600">94%</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
