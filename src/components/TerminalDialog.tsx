import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Terminal } from "lucide-react";

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TerminalDialog = ({ open, onOpenChange }: TerminalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#232F3E] border-[#FF9900] border-2 max-w-md p-0 overflow-hidden">
        <div className="bg-[#FF9900] px-4 py-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#232F3E]" />
          <span className="text-sm font-mono font-semibold text-[#232F3E]">Terminal</span>
        </div>
        <div className="p-6 font-mono">
          <div className="flex items-start gap-2">
            <span className="text-[#FF9900]">$</span>
            <div>
              <p className="text-[#00FF00] text-sm mb-2">Email Address Copied To Clipboard!</p>
              <p className="text-gray-400 text-xs">rajkolala10@gmail.com</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;
