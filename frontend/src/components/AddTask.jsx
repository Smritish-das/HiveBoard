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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar22 } from "./Calender22";
import axios from "axios";
import { HouseholdContext } from "../../context/HouseHoldContext";

const AddTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = React.useState(new Date());
  const { currentHousehold, setTask } = useContext(HouseholdContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/task/${currentHousehold._id}`,
        {
          title: title,
          description: description,
          dueDate: new Date(date).toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/task/${currentHousehold._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTask(response.data);

      setDate(new Date());
      setDescription("");
      setTitle("")
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="ml-2 !bg-[#A456F7] text-white !text-sm hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.2)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] !transition-all duration-200 hover:-translate-y-1 "
          >
            <i class="ri-sticky-note-line"></i>Add Task
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[425px] bg-[#1E293B]"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="text-secondary text-2xl font-semibold">
                    Create New Task
                  </DialogTitle>
                </DialogHeader>
                <div>
                  <Label className="text-base font-semibold mb-2">
                    Task Title
                  </Label>
                  <Input
                    className="mb-5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Label className="text-base font-semibold mb-2">
                    Description
                  </Label>
                  <Textarea
                    className="mb-5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Calendar22 date={date} setDate={setDate} />
                </div>
                <DialogFooter className="flex flex-row justify-end mt-5">
                  <DialogClose asChild>
                    <Button
                      type="button"
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
                      Add Task
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTask;
