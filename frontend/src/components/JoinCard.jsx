import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const JoinCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!p-5 bg-gradient-to-r from-violet-500/10 to-purple-600/10 text-violet-300 border border-violet-500/30 hover:bg-violet-500/20 hover:-translate-y-1 transition-all duration-300 px-6 py-3 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          <span className="mr-2">🔗</span>
          Join Hive
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-md flex flex-col items-center justify-center ">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="text-3xl bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent">
            Connect to Hive
          </DialogTitle>
          <DialogDescription className="w-[70%] text-center">
            Enter the quantum access code from your hive administrator
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 w-full ">
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="link" className="text-xs">
              QUANTUM ACCESS CODE
            </Label>
            <Input id="code" placeholder="e.g., QTM_7X9-VAL" className="p-5" />
          </div>
        </div>
        <div className="flex flex-row  w-full justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-[#171a29] hover:!border-transparent h-full !px-12"
            >
              Cancel
            </Button>
          </DialogClose>

          <button className="!bg-[#A556F7] hover:!border-transparent">
            Connect to Hive
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCard;
