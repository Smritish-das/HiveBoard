import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HouseholdCards = ({name,member,task,note,grocery,household,setCurrentHousehold,setTask, setNote, setGrocery}) => {

  const navigate = useNavigate();

  return (
    <div onClick={async () => {
      setCurrentHousehold(household);
      const tasks = await fetch(`${import.meta.env.VITE_BASE_URL}/task/${household._id}`, {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        if(tasks.ok){
          const tasksData = await tasks.json();
          setTask(tasksData)
        }
      const groceries = await fetch(`${import.meta.env.VITE_BASE_URL}/grocery/${household._id}`, {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        if(groceries.ok){
          const groceriesData = await groceries.json();
          setGrocery(groceriesData)
        }
      const notes = await fetch(`${import.meta.env.VITE_BASE_URL}/note/${household._id}`, {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(notes.ok){
          const notesData = await notes.json();
          setNote(notesData)
        }
      
      navigate('/household')
    }}>
      <Card className="cursor-pointer rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#050507]/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20 overflow-hidden relative group">
        
        
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex flex-row justify-between items-start p-6 lg:p-8 relative z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold text-white truncate mb-2">{name}</h2>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span className="truncate">{member} Active {member > 1 ? 'Members' : 'Member'}</span>
            </p>
          </div>
          <div className="h-15 w-15 lg:h-16 lg:w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-violet-500/30 flex-shrink-0 ml-4 group-hover:shadow-violet-500/50 transition-all duration-300">
            🏙️
          </div>
        </div>
        
        <div className="px-6 lg:px-8 pb-6 lg:pb-8 relative z-10">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-violet-500/5 to-purple-600/5 border border-violet-500/10 rounded-xl hover:bg-violet-500/10 transition-all duration-300">
              <div className="text-xl lg:text-2xl font-bold text-violet-300 mb-1">{task}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tasks</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-violet-500/5 to-purple-600/5 border border-violet-500/10 rounded-xl hover:bg-violet-500/10 transition-all duration-300">
              <div className="text-xl lg:text-2xl font-bold text-violet-300 mb-1">{grocery}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Items</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-violet-500/5 to-purple-600/5 border border-violet-500/10 rounded-xl hover:bg-violet-500/10 transition-all duration-300">
              <div className="text-xl lg:text-2xl font-bold text-violet-300 mb-1">{note}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Notes</div>
            </div>
          </div>
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
      </Card>
    </div>
  );
};

export default HouseholdCards;