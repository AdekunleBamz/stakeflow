type SimulatorInputProps = {
  label: string;
  value: string;
  unit: string;
  min: number;
  max: number;
};

export function SimulatorInput({ label, value, unit, min, max }: SimulatorInputProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-400">{label}</label>
        <span className="text-xs text-slate-500">{min} - {max} {unit}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
          defaultValue={value}
        />
        <span className="min-w-[60px] text-right font-medium text-white">
          {value} {unit}
        </span>
      </div>
    </div>
  );
}
