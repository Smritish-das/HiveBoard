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

const CreateCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-2 !bg-[#A456F7] text-white !text-sm hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.2)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] !transition-all duration-200 hover:-translate-y-1 "
        >
          Create Hive
        </Button>
      </DialogTrigger>

      <DialogContent className="p-5  rounded-2xl sm:max-w-md flex flex-col items-center justify-center">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="text-3xl bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent">
            Create your Hive
          </DialogTitle>
          <DialogDescription>
            Configure your quantum household matrix
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 w-full ">
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="link" className="text-xs">
              HIVE NAME
            </Label>
            <Input
              id="link"
              placeholder="e.g., Neo Apartment Complex"
              className="p-5"
            />
          </div>
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="link" className="text-xs ">
              NEURAL DESCRIPTION
            </Label>
            <Input
              id="description"
              placeholder="Brief description of your hive"
              className="p-5"
            />
          </div>
        </div>
        <div className="flex flex-row  w-full justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-[#171a29] hover:!border-transparent h-full !px-12"
            >
              Close
            </Button>
          </DialogClose>

          <button className="!bg-[#A556F7] hover:!border-transparent">
            Intialize Hive
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCard;
