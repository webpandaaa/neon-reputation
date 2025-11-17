import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostFiltersProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export const PostFilters = ({ timeRange, onTimeRangeChange }: PostFiltersProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-foreground">Time Range:</label>
      <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 1 Week</SelectItem>
          <SelectItem value="month">Last 1 Month</SelectItem>
          <SelectItem value="year">Last Year</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
