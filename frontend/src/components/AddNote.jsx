import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { HouseholdContext } from "../../context/HouseHoldContext";

const AddNote = () => {
  const [content, setContent] = useState("");
  const { currentHousehold, setNote } = useContext(HouseholdContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note/${currentHousehold._id}`,
        {
          content:content
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/note/${currentHousehold._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNote(response.data);

      setContent("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger
          className="ml-2 !bg-[#A456F7] text-white !text-sm hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.2)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] !transition-all duration-200 hover:-translate-y-1 "
          asChild
        >
          <Button variant="outline">
            <i class="ri-sticky-note-line"></i>Add Note
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[425px] bg-[#1E293B]"
          showCloseButton={false}
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-secondary text-2xl font-semibold">
                Create New Note
              </DialogTitle>
            </DialogHeader>
            <div>
              <Label className="text-base font-semibold mb-2">
                Content
              </Label>
              <Textarea
                className="mb-5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <DialogFooter className="flex flex-row justify-end mt-5">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="hover:!border-transparent !font-medium !text-sm  !bg-[#292E4E] hover:!bg-[#3A4070] !transition-colors duration-300"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="hover:!border-transparent !bg-secondary hover:!shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:-translate-y-1 !transition-all duration-200 !text-sm  !text-white font-medium "
                >
                  Create Note
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNote;
