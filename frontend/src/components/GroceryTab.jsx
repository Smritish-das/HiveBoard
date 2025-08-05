import React, { useState, useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { HouseholdContext } from "../../context/HouseHoldContext";
import { Label } from "./ui/label";
import axios from "axios";
import EditNote from "./EditNote";
import EditGrocery from "./EditGrocery";
const GroceryTab = () => {
  const [name, setName] = useState("");
  const { grocery, setGrocery, currentHousehold } =
    useContext(HouseholdContext);
  const [quantity, setQuantity] = useState(1);
  const [boughtGrocery, setBoughtGrocery] = useState(
    grocery.filter((item) => item.bought).length
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/grocery/${currentHousehold._id}`,
      { itemName: name, quantity: quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    if (response.status === 200) {
      const data = response.data;
      setGrocery([...grocery, data]);
    }
    setName("");
  };

  const handleToggleBought = (id, bought) => {
    setGrocery((grocery) =>
      grocery.map((item) => (item._id === id ? { ...item, bought } : item))
    );

    setBoughtGrocery(
      grocery.filter((item) => item.bought).length + (bought ? 1 : -1)
    );
  };

    const deleteGrocery = async (groceryId) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(
        `${baseUrl}/grocery/${currentHousehold._id}/${groceryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setGrocery((prevG) => prevG.filter((n) => n._id !== groceryId));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={submitHandler}
        className="flex flex-row w-full p-5 gap-2 !bg-[#0D0D1E] rounded-xl"
      >
        <Input
          id="name"
          type="name"
          placeholder="Add Grocery Item ..."
          required
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex flex-row items-center rounded-xl bg-[#1E293B] gap-2">
          <Button
            type="button"
            onClick={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
            className="!bg-transparent !text-xl !p-0 text-white hover:!bg-[#646975] !px-2 hover:!border-transparent"
          >
            -
          </Button>
          <p className="flex w-full h-full items-center ">{quantity}</p>
          <Button
            type="button"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            className="!bg-transparent !p-0 !text-base text-white hover:!bg-[#646975] !px-2 hover:!border-transparent"
          >
            +
          </Button>
        </div>
        <Button
          type="submit"
          className="!bg-[#A456F7] text-white !text-sm hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.1)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.12)] !transition-all duration-200 hover:-translate-y-1 "
        >
          Add Item
        </Button>
      </form>
      <span className="flex flex-row gap-2 w-full mt-2 mb-2">
        <p className="text-sm bg-[#0D0D1E] p-3 rounded-lg border-1 border-primary-foreground text-muted-foreground">
          Total Items : <i className="text-primary">{grocery.length}</i>
        </p>
        <p className="text-sm bg-[#0D0D1E] p-3 rounded-lg border-1 border-primary-foreground text-muted-foreground">
          Bought : <i className="text-primary">{boughtGrocery}</i>
        </p>
      </span>

      <section className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
        <div className="bg-[#0D0D1E] p-5 border-1 border-primary-foreground rounded-2xl flex-1">
          <div className="flex flex-row justify-between text-lg border-b-1 pb-3 border-primary-foreground ">
            <h2 className="font-semibold">
              <i class="ri-file-list-3-line mr-2"></i>
              Needed
            </h2>
            <i className="bg-[#1E293B] px-2 rounded-xl text-base flex items-center">
              {grocery.length - boughtGrocery}
            </i>
          </div>
          <div className="mt-2">
            {grocery
              .filter((item) => !item.bought)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-[#182336] flex justify-between items-center p-1 mb-2 rounded-lg cursor-pointer group "
                >
                  <span className="flex space-x-4">
                    <span
                      onClick={() => handleToggleBought(item._id, true)}
                      className="hover:!border-transparent !bg-[#0D0D1E] !border-1 !border-primary-foreground rounded-lg p-3"
                    ></span>
                    <Label>{item.itemName}</Label>
                  </span>
                  <div className="flex flex-row gap-x-2">
                    <i className="px-2 py-1 bg-[#263245] rounded-full text-xs">
                      {item.quantity}
                    </i>
                    <section className="flex flex-row justify-start gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                      <EditGrocery name={item.itemName} qt={item.quantity} id={item._id} />
                      <i
                        onClick={() => {
                          deleteGrocery(item._id)
                        }}
                        className="!bg-transparent rounded-lg aspect-square ri-delete-bin-7-fill text-base text-red-400 flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
                      ></i>
                    </section>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-[#0D0D1E] p-5 border-1 border-primary-foreground rounded-2xl flex-1">
          <div className="flex flex-row justify-between text-lg border-b-1 pb-3 border-primary-foreground mb-2 ">
            <h2 className="font-semibold">
              <i class="ri-checkbox-fill text-green-500 mr-2"></i>
              Bought
            </h2>
            <i className="bg-[#1E293B] px-2 rounded-xl text-base flex items-center">
              {boughtGrocery}
            </i>
          </div>

          <div className="mt-2">
            {grocery
              .filter((item) => item.bought)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-[#182336] flex justify-between items-center p-1 rounded-lg px-2 mb-2 cursor-pointer group"
                >
                  <span className="flex space-x-4">
                    <span
                      onClick={() => handleToggleBought(item._id, false)}
                      className="hover:!border-transparent !bg-[#0D0D1E] !border-1 !border-primary-foreground rounded-lg px-1"
                    >
                      <i class="ri-check-line text-secondary"></i>
                    </span>
                    <Label className="line-through">{item.itemName}</Label>
                  </span>
                  <div className="flex flex-row gap-x-2">
                    <i className="px-2 py-1 bg-[#263245] rounded-full text-xs">
                      {item.quantity}
                    </i>
                    <section className="flex flex-row justify-start gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                      <EditGrocery name={item.itemName} qt={item.quantity} />
                      <i
                        onClick={() => {}}
                        className="!bg-transparent rounded-lg aspect-square ri-delete-bin-7-fill text-base text-red-400 flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
                      ></i>
                    </section>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroceryTab;
