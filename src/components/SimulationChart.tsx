
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SimulationChartProps {
  data: any[];
  title?: string;
}

const chartConfig = {
  temperatura: {
    label: "Temperatura",
    color: "#3b82f6",
  },
  biomasa: {
    label: "Biomasa",
    color: "#ef4444",
  },
  sustrato: {
    label: "Sustrato",
    color: "#10b981",
  },
  nitrogeno: {
    label: "Nitrógeno",
    color: "#f59e0b",
  },
  pH: {
    label: "pH",
    color: "#8b5cf6",
  },
};

export function SimulationChart({ data, title = "Simulation Results" }: SimulationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tiempo" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line yAxisId="left" type="monotone" dataKey="temperatura" stroke="#3b82f6" strokeWidth={2} name="Temperatura" />
              <Line yAxisId="right" type="monotone" dataKey="biomasa" stroke="#ef4444" strokeWidth={2} name="Biomasa" />
              <Line yAxisId="left" type="monotone" dataKey="sustrato" stroke="#10b981" strokeWidth={2} name="Sustrato" />
              <Line yAxisId="left" type="monotone" dataKey="nitrogeno" stroke="#f59e0b" strokeWidth={2} name="Nitrógeno" />
              <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#8b5cf6" strokeWidth={2} name="pH" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
