import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input className="pl-12 rounded-full " placeholder="Search" />
    </div>
  );
};

export default SearchInput;
