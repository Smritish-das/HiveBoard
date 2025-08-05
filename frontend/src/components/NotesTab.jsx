import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { HouseholdContext } from "../../context/HouseHoldContext";
import { Label } from "./ui/label";
import axios from "axios";
import { Card } from "./ui/card";
import ReactMarkdown from "react-markdown";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
const NotesTab = () => {
  const { note, setNote, currentHousehold } = useContext(HouseholdContext);
  const [state, setState] = useState(false)
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} · ${timeStr}`;
  };

  const changePin = async (noteId, currentPin) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.patch(
        `${baseUrl}/note/${currentHousehold._id}/${noteId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setNote((prevNotes) =>
          prevNotes.map((n) =>
            n._id === noteId ? { ...n, pin: !currentPin } : n
          )
        );
      }
    } catch (error) {
      console.error("Failed to change pin:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(
        `${baseUrl}/note/${currentHousehold._id}/${noteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setNote((prevNotes) => prevNotes.filter((n) => n._id !== noteId));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="mt-2">
      <section className="flex flex-row justify-between w-full">
        <AddNote />
        <div className="flex flex-row justify-between">
          <p className="text-muted-foreground text-sm flex items-center mr-2">
            Filter : 
          </p>
          <Select onValueChange={(value) => setState(value)}>
            <SelectTrigger className="w-35 !text-white/90 !transition-colors duration-300  mr-2 !text-sm !border-1 !bg-[#0F172A] !h-8 !border-primary-foreground hover:!bg-[#0B0C1B] shadow-[0_0_12px_3px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.07)]">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={true}>Pinned Notes</SelectItem>
              <SelectItem value={false}>All Notes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {note
        .filter((value) =>{
          if(!state)
            return value
          else if(state && value.pin)
            return value
        })
        .map((item) => (
          <div key={item._id} className="  p-1 rounded-lg  ">
            <Card
              className={`group border-primary-foreground shadow-lg hover:shadow-[0_0_20px_#a78bfa88] p-5 bg-[#0C0E1F] hover:cursor-pointer active:scale-95 duration-300 ease-in-out hover:-translate-y-1 transition-all ${
                item.pin ? "border-l-4 border-l-yellow-400" : ""
              }`}
            >
              <section className="flex flex-row justify-start gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                <i
                  className={`rounded-lg aspect-square w-9 p-1 ri-pushpin-line text-yellow-400 text-lg flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out ${
                    item.pin ? "bg-[#272123]" : "bg-[#281E4A]"
                  }`}
                  onClick={() => {
                    changePin(item._id, item.pin);
                  }}
                />
                <EditNote data={item.content} id={item._id}></EditNote>
                <i
                  onClick={() => {
                    deleteNote(item._id);
                  }}
                  className="bg-[#281E4A] rounded-lg aspect-square w-9 p-1 ri-delete-bin-7-fill text-lg text-gray-400 flex items-end justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
                ></i>
              </section>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="!text-4xl font-serif text-secondary"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-sm text-white/90" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-yellow-300" {...props} />
                  ),
                  code: ({ node, inline, ...props }) => (
                    <code
                      className={`font-mono bg-gray-800 text-green-300 px-1 rounded ${
                        inline ? "text-sm" : ""
                      }`}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-4 text-sm list-disc" {...props} />
                  ),
                }}
              >
                {item.content}
              </ReactMarkdown>
              <span className="border-t-1 border-primary-foreground flex flex-row justify-between">
                <p className=" text-xs text-muted-foreground pt-4">
                  Last Edited: {formatDateTime(item.updatedAt)}
                </p>
                {item.pin && (
                  <i className="ri-pushpin-line text-yellow-400 text-lg flex items-end justify-center " />
                )}
              </span>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesTab;
