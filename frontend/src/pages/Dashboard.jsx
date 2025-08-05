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
import { HouseholdContext } from "../../context/HouseHoldContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const {
    households,
    setHouseholds,
    setCurrentHousehold,
    setTask,
    setNote,
    setGrocery,
  } = useContext(HouseholdContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all(
      user.houseHoldIds.map((id) =>
        fetch(`${import.meta.env.VITE_BASE_URL}/household/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => res.json())
      )
    ).then((responses) => {
      setHouseholds(responses.filter((res) => res));
    });
  }, [user.houseHoldIds, setHouseholds]);

  return (
    <div className="flex items-center justify-center w-screen h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#050507] to-[#000000]"></div>
      <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 via-purple-600/5 to-transparent animate-pulse"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
          animation: "float 20s ease-in-out infinite",
        }}
      ></div>

      <Tabs
        defaultValue="dashboard"
        className="h-full w-full flex flex-col lg:flex-row gap-0 z-10 relative"
      >
        <div className="lg:hidden w-full h-16 flex items-center justify-between px-4 border-b border-violet-500/20 bg-gradient-to-r from-[#0f0f23]/90 to-[#050507]/95 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <i className="ri-artboard-2-line text-lg text-white"></i>
            </div>
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
              HiveBoard
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:bg-violet-500/20 border border-violet-500/30"
          >
            <i
              className={`ri-${sidebarOpen ? "close" : "menu"}-line text-xl`}
            ></i>
          </Button>
        </div>

        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative 
          top-16 lg:top-0 
          left-0 
          z-50 lg:z-10
          w-72 lg:w-[280px] xl:w-[280px] 
          h-[calc(100vh-4rem)] lg:h-full 
          flex flex-col 
          bg-gradient-to-b from-[#0f0f23]/90 to-[#050507]/95
          backdrop-blur-xl
          border-r border-violet-500/20
          shadow-2xl shadow-violet-500/10
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="hidden lg:flex flex-row gap-4 items-center justify-start p-8 border-b border-violet-500/15">
            <div className="h-10 w-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse">
              <span className="text-xl">🔮</span>
            </div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
              HiveBoard
            </h2>
          </div>

          <div className="px-6 py-6 flex-1 flex flex-col">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
              NAVIGATION
            </p>
            <div className="flex flex-col w-full flex-1 space-y-2">
              <TabsList className="flex flex-col w-full gap-2 h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className="w-full text-slate-400 hover:text-white justify-start text-sm bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-600/10 data-[state=active]:text-violet-300 data-[state=active]:border data-[state=active]:border-violet-500/30 gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-violet-500/10 relative overflow-hidden group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <span className="text-lg">🏠</span>Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="w-full text-slate-400 hover:text-white justify-start text-sm bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-600/10 data-[state=active]:text-violet-300 data-[state=active]:border data-[state=active]:border-violet-500/30 gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-violet-500/10 relative overflow-hidden group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <span className="text-lg">👥</span>Members
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="w-full text-slate-400 hover:text-white justify-start text-sm bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-600/10 data-[state=active]:text-violet-300 data-[state=active]:border data-[state=active]:border-violet-500/30 gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-violet-500/10 relative overflow-hidden group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <span className="text-lg">⚙️</span>Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="w-full px-6 pb-6 border-t border-violet-500/15">
            <div className="mt-6 p-4 bg-gradient-to-r from-violet-500/5 to-purple-600/5 border border-violet-500/10 rounded-2xl hover:bg-violet-500/10 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-white">John Doe</h3>
                  <p className="text-sm text-slate-500">Premium User</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 lg:w-[calc(100%-280px)] h-full overflow-auto">
          <div className="flex flex-col lg:flex-row w-full min-h-[20%] p-6 lg:p-10 gap-6 lg:gap-0">
            <div className="flex-1">
              <h1 className="!text-5xl lg:!text-4xl xl:!text-5xl font-extrabold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent leading-tight mb-2">
                Command Center
              </h1>
              <p className="!text-lg lg:!text-xl text-slate-400 font-medium">
                Orchestrate your digital households with quantum efficiency
              </p>
            </div>
            <div className="flex flex-row gap-4 justify-center lg:justify-end items-start">
              <JoinCard />
              <CreateCard />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 pb-8">
            {households.map((h) => (
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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
