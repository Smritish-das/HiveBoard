import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HouseholdCards from "@/components/HouseholdCards";
import JoinCard from "@/components/JoinCard";
import CreateCard from "@/components/CreateCard";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import {HouseholdContext} from '../../context/HouseHoldContext'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const { households, setHouseholds, setCurrentHousehold, setTask, setNote, setGrocery } = useContext(HouseholdContext)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    Promise.all(
      user.houseHoldIds.map(id => 
        fetch(`${import.meta.env.VITE_BASE_URL}/household/${id}`, {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => res.json())
      )
    ).then(responses => {
      setHouseholds(responses.filter(res => res))
    })
  },[user.houseHoldIds, setHouseholds])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#0D0D1E]">
      <div className="absolute bg-gradient-radial inset-0 from-violet-600/10 to-transparent blur-2xl z-0"></div> 
      <Tabs
        defaultValue="dashboard"
        className="h-full w-full flex flex-col lg:flex-row gap-0 z-10"
      >
        {/* Mobile Header */}
        <div className="lg:hidden w-full h-16 flex items-center justify-between px-4 border-b-2 border-[#281e4b] bg-[#1A1534]">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 bg-secondary rounded-xl flex items-center justify-center">
              <i className="ri-artboard-2-line text-lg text-white"></i>
            </span>
            <h2 className="text-xl font-extrabold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent">
              HiveBoard
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:bg-[#281e4b]"
          >
            <i className={`ri-${sidebarOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          fixed lg:relative 
          top-16 lg:top-0 
          left-0 
          z-50 lg:z-10
          w-64 lg:w-[280px] xl:w-[15%] 
          h-[calc(100vh-4rem)] lg:h-full 
          flex flex-col 
          border-r-2 border-[#281e4b] 
          bg-[#1A1534]
          transition-transform duration-300 ease-in-out
        `}>
          {/* Desktop Header */}
          <div className="hidden lg:flex flex-row gap-5 items-center justify-start p-4 border-b-2 border-[#281e4b]">
            <span className="h-9 w-9 bg-secondary rounded-xl flex items-center justify-center">
              <i className="ri-artboard-2-line text-lg text-white"></i>
            </span>
            <h2 className="text-xl xl:text-2xl font-extrabold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent">
              HiveBoard
            </h2>
          </div>

          <div className="px-4 lg:pl-5 py-3 flex-1 flex flex-col">
            <p className="text-xs text-muted-foreground">NAVIGATION</p>
            <div className="flex flex-col w-full flex-1 my-4">
              <TabsList className="flex flex-col w-full gap-2 h-auto pt-4 bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent gap-3 hover:bg-[#281e4b]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="ri-pie-chart-2-fill"></i>Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent gap-3 hover:bg-[#281e4b]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="ri-group-line"></i>Members
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="w-full !text-white justify-start !text-sm dark:data-[state=inactive]:!bg-transparent gap-3 hover:bg-[#281e4b]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="ri-settings-3-line"></i>Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* User Profile */}
          <div className="w-full px-4 lg:px-5 pb-5">
            <Card className="w-full bg-[#0D0D1E] border-[#281e4b]">
              <CardContent className="flex flex-row gap-3 items-center p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="bg-secondary text-white">CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Premium User</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:w-[calc(100%-280px)] xl:w-[85%] h-full overflow-auto">
          <div className="flex flex-col lg:flex-row w-full min-h-[20%] p-4 lg:p-10 gap-4 lg:gap-0">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl xl:!text-4xl font-bold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent">
                Command Center
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Orchestrate your digital households with quantum efficiency
              </p>
            </div>
            <div className="flex flex-row gap-3 lg:gap-5 justify-center lg:justify-end">
              <JoinCard />
              <CreateCard />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-12 pb-6">
            {households.map(h => (
              <HouseholdCards 
                key={h._id} 
                setNote={setNote} 
                setGrocery={setGrocery} 
                setTask={setTask} 
                household={h} 
                name={h.name} 
                member={h.members.length} 
                task={h.taskscount} 
                note={h.notescount} 
                grocery={h.groceriescount} 
                setCurrentHousehold={setCurrentHousehold} 
              />
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;