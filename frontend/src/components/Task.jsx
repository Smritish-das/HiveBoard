import { useContext } from "react";
import { Card } from "@/components/ui/card";
import EditTask from "./EditTask";
import axios from "axios";
import { HouseholdContext } from "../../context/HouseHoldContext";
const Task = ({ title, description, due, id }) => {
  const { setTask, currentHousehold } = useContext(HouseholdContext);
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(
        `${baseUrl}/task/${currentHousehold._id}/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        const updated = await axios.get(
          `${baseUrl}/task/${currentHousehold._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTask(updated.data);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const dueDate = due
    ? new Date(due).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No due date";

  return (
    <Card className="group p-5 w-full !bg-[#0D0D1E] !border-1 !border-primary-foreground !rounded-3xl !border-l-4 !border-l-secondary !transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/30 cursor-grab active:cursor-grabbing">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-bold">{title}</h2>
        <section className="flex flex-row justify-start gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
          <EditTask
            title={title}
            description={description}
            date={due}
            _id={id}
          />
          <i
            onClick={() => {
              deleteTask(id);
            }}
            className="bg-[#281E4A] rounded-lg aspect-square cursor-pointer w-7  p-0.5 ri-delete-bin-7-fill text-base text-red-400 flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
          ></i>
        </section>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-row justify-between">
        <span className="text-muted-foreground text-xs">
          <i className="ri-calendar-line text-base text-secondary"></i> Due:{" "}
          {dueDate}
        </span>
        <span className="w-6 text-center bg-secondary aspect-square rounded-sm">
          J
        </span>
      </div>
    </Card>
  );
};

export default Task;
