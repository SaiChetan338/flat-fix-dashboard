
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';

interface FlatSelectorProps {
  ownedFlats: string[];
  selectedFlat: string;
  onFlatChange: (flat: string) => void;
}

const FlatSelector = ({ ownedFlats, selectedFlat, onFlatChange }: FlatSelectorProps) => {
  if (ownedFlats.length <= 1) {
    return null; // Don't show selector if user owns only one flat
  }

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Building className="h-4 w-4 text-gray-500" />
      <Select value={selectedFlat} onValueChange={onFlatChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select flat" />
        </SelectTrigger>
        <SelectContent>
          {ownedFlats.map((flat) => (
            <SelectItem key={flat} value={flat}>
              Flat {flat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FlatSelector;
