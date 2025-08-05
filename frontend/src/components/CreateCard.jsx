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
        <Button className="!p-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 hover:-translate-y-1 transition-all duration-300 px-6 py-3 rounded-2xl shadow-lg shadow-violet-500/40 relative overflow-hidden group animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          <span className="mr-1">⚡</span>
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
