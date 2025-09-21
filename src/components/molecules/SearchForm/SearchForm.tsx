import { Search } from "lucide-react";
import { FormEvent } from "react";

interface SearchFormProps {
  onSubmit: (e: FormEvent) => void;
  value: string;
  onChange: (value: string) => void;
}

const SearchForm = ({ onSubmit, value, onChange }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="max-w-md w-full  min-w-[300px] flex items-center px-2 gap-2 border border-gray-200 focus-within:border-green-400 rounded-lg h-10">
        <span>
          <Search className="h-4 w-4" />
        </span>
        <input
          type="search"
          name="search"
          id="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none flex-1"
          placeholder="Searching..."
        />
      </div>
    </form>
  );
};

export default SearchForm;
