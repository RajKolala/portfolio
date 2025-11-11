import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const buildSteps = [
  "$ npm run build-contact",
  "> building configuration...",
  "> compiling email modules...",
  "> linking dependencies...",
  "> optimizing clipboard service...",
  "> Link Copied To Clipboard",
];

const TerminalDialog = ({ open, onOpenChange }: TerminalDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < buildSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#232F3E] border-[#FF9900] border-2 max-w-md p-0 overflow-hidden">
        <div className="bg-[#FF9900] px-4 py-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#232F3E]" />
          <span className="text-sm font-mono font-semibold text-[#232F3E]">Terminal</span>
        </div>
        <div className="p-6 font-mono text-xs space-y-1">
          {buildSteps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className={index === 0 ? "text-[#FF9900]" : index === buildSteps.length - 1 ? "text-[#00FF00] font-semibold mt-2" : "text-gray-400"}>
              {step}
            </div>
          ))}
          {currentStep < buildSteps.length - 1 && (
            <span className="inline-block w-2 h-4 bg-[#FF9900] animate-pulse ml-1"></span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;
