import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskTab from "./TaskTab";
import NotesTab from "./NotesTab";
import GroceryTab from "./GroceryTab";
import AddTask from "./AddTask";


const HouseholdTabs = () => {
  

  return (
    <>
      <div className="px-15 py-8">
        <Tabs defaultValue="task">
          <div className="flex flex-row justify-between">
            <TabsList className="!bg-[#0D0D1E] p-1 !h-auto flex gap-2 !border-1 !border-primary-foreground">
              <TabsTrigger
                value="task"
                className="!bg-transparent !px-7 !py-2 !text-sm !transition-colors duration-300  hover:!border-transparent hover:!bg-[#2e255c]"
              >
                <i class="ri-file-text-fill"></i>Tasks
              </TabsTrigger>
              <TabsTrigger
                value="grocery"
                className="!bg-transparent !text-sm !py-2 !px-7 !transition-colors duration-300  hover:!border-transparent hover:!bg-[#2e255c]"
              >
                <i class="ri-shopping-cart-line"></i>Groceries
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="!bg-transparent !text-sm !py-2 !px-7 !transition-colors duration-300  hover:!border-transparent hover:!bg-[#2e255c]"
              >
                <i class="ri-booklet-fill"></i>Notes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="task" className='flex flex-row justify-end items-center'>
              <AddTask />
            </TabsContent>
              
          </div>
          <TabsContent value="task">
            <TaskTab></TaskTab>
          </TabsContent>
          <TabsContent value="grocery">
            <GroceryTab></GroceryTab>
          </TabsContent>
          <TabsContent value="notes">
            <NotesTab></NotesTab>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default HouseholdTabs;
