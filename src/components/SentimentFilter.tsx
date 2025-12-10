import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SentimentFilter = ({ value, onChange }: any) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-foreground">Sentiment:</label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Select sentiment" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Sentiments</SelectItem>
          <SelectItem value="Positive">Positive</SelectItem>
          <SelectItem value="Neutral">Neutral</SelectItem>
          <SelectItem value="Negative">Negative</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
