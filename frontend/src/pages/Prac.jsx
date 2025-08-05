import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HouseholdCards from "@/components/HouseholdCards";
import JoinCard from "@/components/JoinCard";
import CreateCard from "@/components/CreateCard";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from 'axios'
import { useEffect } from "react";
import {HouseholdContext} from '../../context/HouseHoldContext'


const Prac = () => {
    const { user } = useContext(UserContext)
    const { households, setHouseholds, setCurrentHousehold, setTask, setNote, setGrocery } = useContext(HouseholdContext)


  return (
    <div className="flex items-center justify-center w-screen h-screen ">
       <div className="absolute bg-radial inset-0 from-violet-600/20 to-transparent blur-2xl z-0"></div> 
      <Tabs
        defaultValue="dashboard"
        className="h-full w-full  flex flex-row gap-0 z-10"
      >
        <div className="w-[15%] h-full flex flex-col border-r-2 border-[#281e4b">
          <div className="flex flex-row gap-5  items-center justify-start mt-5 mb-5 pl-5">
            <span className="h-9 w-9 bg-secondary rounded-xl flex items-center justify-center">
              <i class="ri-artboard-2-line text-lg"></i>
            </span>
            <h2 className=" text-2xl font-bold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent ">
              HiveBoard
            </h2>
          </div>
          <div className="pl-5 py-3  flex-1 flex flex-col ">
            <p className="text-xs text-muted-foreground">NAVIGATION</p>
            <div className="flex flex-col  w-[85%] flex-1  my-4  ">
              <TabsList className="flex flex-col w-full gap-2  h-22 pt-10 bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent"
                >
                  <i class="ri-pie-chart-2-fill"></i>Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent"
                >
                  <i class="ri-group-line"></i>Members
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent"
                >
                  <i class="ri-settings-3-line"></i>Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div className=" w-full px-5 pb-5">
            <Card className="w-full max-w-sm">
              <CardContent className="flex flex-row gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Premium User</p>
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[80%]  h-full ">
          <div className="flex flex-row  w-full h-[20%]  p-10">
            <div className=" flex-1 ">
              <h1 className="!text-4xl font-bold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent ">
                Command Center
              </h1>
              <p>Orchestrate your digital households with quantum efficiency</p>
            </div>
            <div className="mx-2 flex flex-row gap-5">
              <JoinCard></JoinCard>
              <CreateCard></CreateCard>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-10 px-12 ">
            {
              households.map(h => (<HouseholdCards key={h._id} setNote={setNote} setGrocery={setGrocery} setTask={setTask} household={h} name={h.name} member={h.members.length} task={h.taskscount} note={h.notescount} grocery={h.groceriescount} setCurrentHousehold={setCurrentHousehold} ></HouseholdCards> ))
            }
            
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default Prac