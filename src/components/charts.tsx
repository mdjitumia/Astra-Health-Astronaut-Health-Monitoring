"use client";

import { useId, useSyncExternalStore } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import type { MetricPoint } from "@/lib/demo-data";

// Detect client-side mount without a setState-in-effect (React-idiomatic
// useSyncExternalStore). Used to defer recharts ResponsiveContainer rendering
// until a real measured width exists, avoiding the NaN-on-first-paint warning.
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true, // client snapshot
    () => false, // server snapshot
  );
}

const AXIS = "#6b8ca8";
const GRID = "rgba(32, 221, 245, 0.04)";

const palette = {
  cyan: "#20ddf5",      // electric cyan — primary
  sky: "#20d6b5",       // medical teal — healthy
  blue: "#a9dff5",      // soft ice blue — secondary
  amber: "#f3b85b",     // warm amber — attention
  violet: "#a9a7ff",    // muted lavender — analytical
  emerald: "#20d6b5",   // teal (alias for good status)
  red: "#ff6b78",       // coral red — critical
};

export type SeriesColor = keyof typeof palette;

function TooltipBox({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number; name?: string; color?: string }[];
  label?: string;
  unit?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-liquid rounded-lg px-3 py-2 text-xs">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ice/40">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="font-mono font-semibold text-foreground">
            {p.value}
            {unit ?? ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TrendArea({
  data,
  color = "cyan",
  unit = "",
  height = 180,
  showX = true,
}: {
  data: MetricPoint[];
  color?: SeriesColor;
  unit?: string;
  height?: number;
  showX?: boolean;
}) {
  const c = palette[color];
  const mounted = useMounted();
  const rid = useId();
  const id = `grad-${rid.replace(/:/g, "")}`;
  if (!mounted) return <div style={{ height }} className="w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -4 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity={0.45} />
            <stop offset="100%" stopColor={c} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis
          dataKey="t"
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={{ stroke: GRID }}
          tickLine={false}
          hide={!showX}
          minTickGap={12}
        />
        <YAxis
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
          domain={["auto", "auto"]}
        />
        <Tooltip content={<TooltipBox unit={unit} />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={c}
          strokeWidth={2}
          fill={`url(#${id})`}
          dot={false}
          activeDot={{ r: 3, fill: c }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({
  data,
  series,
  unit = "",
  height = 200,
}: {
  data: Record<string, number | string>[];
  series: { key: string; color: SeriesColor; name?: string }[];
  unit?: string;
  height?: number;
}) {
  const mounted = useMounted();
  if (!mounted) return <div style={{ height }} className="w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -4 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis
          dataKey="t"
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={{ stroke: GRID }}
          tickLine={false}
          minTickGap={12}
        />
        <YAxis
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<TooltipBox unit={unit} />} />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={palette[s.color]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MiniBars({
  data,
  color = "sky",
  unit = "",
  height = 160,
}: {
  data: MetricPoint[];
  color?: SeriesColor;
  unit?: string;
  height?: number;
}) {
  const mounted = useMounted();
  if (!mounted) return <div style={{ height }} className="w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -4 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis
          dataKey="t"
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={{ stroke: GRID }}
          tickLine={false}
          minTickGap={8}
        />
        <YAxis
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<TooltipBox unit={unit} />} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="value" fill={palette[color]} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}



export function Gauge({
  value,
  max = 100,
  color = "cyan",
  label,
  unit,
  size = 120,
}: {
  value: number;
  max?: number;
  color?: SeriesColor;
  label?: string;
  unit?: string;
  size?: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const data = [{ name: "v", value: pct, fill: palette[color] }];
  const mounted = useMounted();

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {mounted && (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="75%"
            outerRadius="100%"
            data={data}
            startAngle={220}
            endAngle={-40}
          >
            <defs>
              <linearGradient id="gauge-bg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.24 0.03 256)" />
                <stop offset="100%" stopColor="oklch(0.2 0.03 256)" />
              </linearGradient>
            </defs>
            <RadialBar
              dataKey="value"
              background={{ fill: "url(#gauge-bg)" }}
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-1">
        <div className="flex items-baseline justify-center gap-0.5 whitespace-nowrap">
          <span className="font-mono text-2xl font-semibold leading-none text-foreground">
            {value}
          </span>
          {unit && (
            <span className="text-[10px] leading-none text-muted-foreground">
              {unit.trim()}
            </span>
          )}
        </div>

        {label && (
          <span className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}


export function CategoryBars({
  data,
  unit = "",
  height = 180,
  colorByValue,
}: {
  data: { label: string; value: number; status?: "good" | "warn" | "alert" }[];
  unit?: string;
  height?: number;
  colorByValue?: boolean;
}) {
  const colorMap = {
    good: palette.emerald,
    warn: palette.amber,
    alert: palette.red,
  };

  const mounted = useMounted();

  if (!mounted) {
    return <div style={{ height }} className="w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 12, bottom: 4, left: 8 }}
      >
        <CartesianGrid stroke={GRID} horizontal={false} />

        <XAxis
          type="number"
          tick={{ fill: AXIS, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="label"
          tick={{ fill: AXIS, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={92}
        />

        <Tooltip
          content={<TooltipBox unit={unit} />}
          cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
        />

        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={
                colorByValue && d.status
                  ? colorMap[d.status]
                  : palette.cyan
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
