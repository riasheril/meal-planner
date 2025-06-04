
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCalendar: () => void;
  onChooseDifferent: () => void;
}

const CompletionModal = ({ isOpen, onClose, onGoToCalendar, onChooseDifferent }: CompletionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">🎉 Perfect!</DialogTitle>
          <DialogDescription className="text-center">
            You've collected all 7 recipes you need for the week! 
            What would you like to do next?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button onClick={onGoToCalendar} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Build Plan
          </Button>
          <Button onClick={onChooseDifferent} variant="outline" className="w-full">
            Edit Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionModal;