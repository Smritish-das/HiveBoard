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
import axios from "axios";
import { HouseholdContext } from "../../context/HouseHoldContext";
import { Input } from "./ui/input";

const EditGrocery = ({ name, qt, id }) => {
  const [item, setItem] = useState(name);
  const [quantity, setQuantity] = useState(Number(qt));
  const [disabled, setDisabled] = useState(false);
  const { currentHousehold, setGrocery } = useContext(HouseholdContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/grocery/${
          currentHousehold._id
        }/${id}`,
        { itemName: name, quantity: quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/grocery/${currentHousehold._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGrocery(response.data);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <i className=" rounded-lg ri-edit-line text-base px-1 text-gray-400 flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out"></i>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[425px] bg-[#1E293B]"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <Label className="text-secondary text-2xl font-semibold">
                  Edit Grocery
                </Label>

                <div>
                  <Label className="text-base font-semibold mb-2">
                    Item Name
                  </Label>
                  <Input
                    className="mb-5"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2">
                    Quantity
                  </Label>
                  <Input
                    className="mb-5"
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value < 1) setDisabled(true);
                      else setDisabled(false);
                      setQuantity(e.target.value);
                    }}
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
                      disabled={disabled}
                      type="submit"
                      className={`hover:!border-transparent !bg-secondary hover:!shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:-translate-y-1 !transition-all duration-200 !text-sm  !text-white font-medium  ${
                        disabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Save Changes
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

export default EditGrocery;
