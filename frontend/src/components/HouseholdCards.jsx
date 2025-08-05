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
      <Card className="cursor-pointer !rounded-3xl border-2 border-[#281e4b] bg-[#0D0D1E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_20px_rgba(255,255,255,0.15)] overflow-hidden">
        <div className="flex flex-row justify-between px-4 sm:px-6 lg:px-7 pt-4 sm:pt-5">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white truncate">{name}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
              <i className="ri-group-3-line text-secondary mr-1 flex-shrink-0"></i>
              <span className="truncate">{member} Active {member > 1 ? 'members' : 'member'}</span>
            </p>
          </div>
          <span className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-[#a257f7] flex items-center justify-center rounded-xl flex-shrink-0 ml-3">
            <i className="ri-home-2-fill text-lg sm:text-xl lg:text-2xl text-white"></i>
          </span>
        </div>
        
        <div className="flex items-center justify-center p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full">
            <div className="aspect-square p-2 sm:p-3 lg:p-4 border-2 border-[#281e4b] bg-[#191432] rounded-xl flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px]">
              <span className="text-base sm:text-lg lg:text-2xl font-semibold text-white">{task}</span>
              <p className="text-muted-foreground text-xs sm:text-sm text-center">Tasks</p>
            </div>
            <div className="aspect-square p-2 sm:p-3 lg:p-4 border-2 border-[#281e4b] bg-[#191432] rounded-xl flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px]">
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-white">{grocery}</span>
              <p className="text-muted-foreground text-xs sm:text-sm text-center">Groceries</p>
            </div>
            <div className="aspect-square p-2 sm:p-3 lg:p-4 border-2 border-[#281e4b] bg-[#191432] rounded-xl flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px]">
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-white">{note}</span>
              <p className="text-muted-foreground text-xs sm:text-sm text-center">Notes</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HouseholdCards;