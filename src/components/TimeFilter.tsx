import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TimeFilter = ({ value, onChange }: any) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-foreground">Time Range:</label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 1 Week</SelectItem>
          <SelectItem value="month">Last 1 Month</SelectItem>
          <SelectItem value="last3months">Last 3 Months</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
