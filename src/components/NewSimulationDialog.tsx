
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import axios from 'axios'

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

export function NewSimulationDialog({ onSimulationStart }: NewSimulationDialogProps) {
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

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
      const response = await axios.post("http://localhost:8000/api/simulate/", data);
      const result = response.data;
      const updatedChartData = result.time.map((t: number, i: number) => ({
        time: t,
        temperature: result.temperature[i],
        biomasa: result.biomasa[i],
      }));
      setChartData(updatedChartData);

      const newSimulation: RunningSimulation = {
        id: `sim-${Date.now()}`,
        name: data.name || `Simulation-${Date.now()}`,
        status: 'completed',
        progress: 100,
        startTime: new Date(),
      };
      onSimulationStart(newSimulation);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Simulation error:", error);
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
                {/* Form Fields... */}
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
            <h3 className="text-lg font-semibold">Simulation Results Preview</h3>
            <ChartContainer className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="biomasa" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} name="Temperature" />
                  <Line yAxisId="biomasa" type="monotone" dataKey="biomasa" stroke="#ef4444" strokeWidth={2} name="Biomasa" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
