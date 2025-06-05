
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
  temperatura: number;
  pH: number;
  sustrato: number;
  nitrogeno: number;
  biomasa: number;
  tiempo: number;
}

interface RunningSimulation {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  chartData?: any[];
}

interface NewSimulationDialogProps {
  onSimulationStart: (simulation: RunningSimulation) => void;
}

export function NewSimulationDialog({ onSimulationStart }: NewSimulationDialogProps) {
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const form = useForm<SimulationData>({
    defaultValues: {
      name: "",
      temperatura: 0,
      pH: 0,
      sustrato: 0,
      biomasa: 0,
      nitrogeno: 0,
      tiempo: 0
    },
  });

const onSubmit = async (data: SimulationData) => {
  try {
    const response = await fetch("http://localhost:8000/api/simulate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    const simulationChartData = result.tiempo.map((t: number, i: number) => ({
      tiempo: t,
      temperatura: result.temperatura[i],
      biomasa: result.biomasa[i],
      sustrato: result.sustrato[i],
      nitrogeno: result.nitrogeno[i],
      pH: result.pH[i],
    }));

    setChartData(simulationChartData);

    const newSimulation: RunningSimulation = {
      id: `sim-${Date.now()}`,
      name: data.name || `Simulation-${Date.now()}`,
      status: "completed",
      progress: 100,
      startTime: new Date(),
      chartData: simulationChartData,
    };

    onSimulationStart(newSimulation);
    setOpen(false);
    form.reset();
  } catch (error) {
    console.error("Error during simulation:", error);
    console.log(form.formState.errors);
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
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sustrato" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sustrato</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="nitrogeno" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nitrogeno</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="biomasa" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biomasa</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                                <FormField control={form.control} name="temperatura" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperatura</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pH" render={({ field }) => (
                  <FormItem>
                    <FormLabel>pH</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tiempo" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiempo</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Start Simulation</Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
