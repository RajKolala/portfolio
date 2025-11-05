import { Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-primary" />
          <span className="font-semibold text-lg">EC2 Dashboard</span>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
          <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
          Running
        </Badge>
      </div>
    </header>
  );
};

export default Header;
