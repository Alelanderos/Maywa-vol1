
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
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
  const [chartData, setChartData] = useState<SimulationData[]>([]);
  
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

const onSubmit = async (data: SimulationData) => {
    try {
        const response = await fetch('http://localhost:8080/api/simulate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const simulationResults = await response.json();
        setChartData(simulationResults);
        setOpen(false);
        form.reset();
    } catch (error) {
        console.error('Error during simulation:', error);
    }
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
                {['name', 'biomasa', 'sustrato', 'nitrogeno', 'temperature', 'pH', 'time'].map((field) => (
                  <FormField
                     key={field}
                     control={form.control}
                     name={field as keyof SimulationData}
                     render={({ field: innerField }) => (
                      <FormItem>
                        <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                        <FormControl>
                          <Input type={typeof form.getValues()[field] === 'number' ? 'number' : 'text'}
                                 {...innerField}
                                 onChange={(e) => innerField.onChange(
                                   typeof form.getValues()[field] === 'number'
                                     ? Number(e.target.value)
                                     : e.target.value
                                 )} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Start Simulation</Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Expected Results Preview</h3>
            <ChartContainer config={chartConfig} className="h-[500px]">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="time" />
                   <YAxis />
                   <Tooltip />
                   <Line type="monotone" dataKey="biomasa" stroke="#8884d8" />
                   <Line type="monotone" dataKey="sustrato" stroke="#82ca9d" />
                   <Line type="monotone" dataKey="nitrogeno" stroke="#ffc658" />
                   <Line type="monotone" dataKey="producto" stroke="#ff7300" />
                   </LineChart>
            </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
