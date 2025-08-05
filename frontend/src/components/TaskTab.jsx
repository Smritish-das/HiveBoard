import { useContext } from "react";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "./Task";
import { HouseholdContext } from "../../context/HouseHoldContext";
import axios from "axios";

const TaskTab = () => {
  const { setTask, task, currentHousehold } = useContext(HouseholdContext);

  const statusMap = {
    1: "todo",
    2: "inProgress",
    3: "done",
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = String(draggableId);
    const sourceStatus = statusMap[source.droppableId];
    const destinationStatus = statusMap[destination.droppableId];
    const newStatus = statusMap[destination.droppableId];
    const newPosition = parseInt(destination.index, 10);
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const updatedTask = { ...task[sourceStatus].find((t) => t._id === taskId) };
    updatedTask.status = destinationStatus;

    const updatedTasks = {
      ...task,
      [sourceStatus]: [...(task[sourceStatus] || [])],
      [destinationStatus]: [...(task[destinationStatus] || [])],
    };

    const [movedTask] = updatedTasks[sourceStatus].splice(source.index, 1);
 
    const newTask = { ...movedTask, status: destinationStatus };

    updatedTasks[destinationStatus].splice(newPosition, 0, newTask);

    setTask(updatedTasks);

    try {
      const patchUrl = `${baseUrl}/task/${currentHousehold._id}/${taskId}`;

      await axios.patch(
        patchUrl,
        {
          status: newStatus,
          position: newPosition,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(
        `${baseUrl}/task/${currentHousehold._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTask(response.data);
    } catch (error) {
      console.error("Error updating task position/status:", error);
    }
  };

  const renderColumn = (title, iconClass, droppableId, tasks = []) => (
    <Droppable droppableId={droppableId.toString()} key={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-full"
        >
          <Card className="p-5 w-full !bg-[#0D0D1E] !border-1 !border-primary-foreground !rounded-3xl">
            <section className="flex flex-row gap-2 border-b-1 pb-4 border-primary-foreground">
              <i className={`h-6 ${iconClass} aspect-square text-center`}></i>
              <p className="font-bold">{title}</p>
              <span className="flex px-2 items-center text-xs rounded-2xl bg-[#2e255c]">
                {tasks.length}
              </span>
            </section>
            {tasks.map((t, idx) => {
              if (!t?._id) {
                console.warn("Skipping task without _id:", t);
                return null;
              }

              return (
                <Draggable key={t._id} draggableId={String(t._id)} index={idx} >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        title={t.title}
                        due={t.dueDate}
                        description={t.description}
                        id={t._id}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Card>
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-5 justify-between mt-5">
        {renderColumn("To-Do", "ri-todo-line bg-blue-400", 1, task?.todo)}
        {renderColumn(
          "In Progress",
          "ri-flashlight-line bg-amber-300",
          2,
          task?.inProgress
        )}
        {renderColumn("Done", "ri-check-line bg-green-400", 3, task?.done)}
      </div>
    </DragDropContext>
  );
};

export default TaskTab;
