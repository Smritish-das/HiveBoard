import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserContext } from "../../context/UserContext";
import { HouseholdContext } from "../../context/HouseHoldContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const {  setCurrentHousehold, households, setHouseholds } = useContext(HouseholdContext);

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    activeHousehold: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(res.data);
        setFormData(prev => ({
          ...prev,
          name: res.data.name || "",
          email: res.data.email || ""
        }));

       
        const householdResponses = await Promise.all(
          res.data.houseHoldIds.map((h) =>
            axios.get(`${import.meta.env.VITE_BASE_URL}/houseHold/${h}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
          )
        );

        const newHouseholds = householdResponses.map((r) => r.data);

        const unique = [
          ...households,
          ...newHouseholds.filter(
            (h) => !households.some((existing) => existing.id === h.id)
          ),
        ];

        setHouseholds(unique);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [households, setHouseholds, setUser]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update`,{
      name:formData.name,
      email:formData.email,
      password:formData.password,
      newPassword:formData.newPassword,
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status === 201){
      setUser(response.data.user)
      const activeHouseHold = await axios.get(`${import.meta.env.VITE_BASE_URL}/houseHold/${formData.id}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })

      if (activeHouseHold.status === 200){
        setCurrentHousehold(activeHouseHold.data)
      }

      navigate('/dashboard')
    }

   
  
  };

  const handleLogout = async() => {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`,{},{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })

    localStorage.removeItem("token");
    
    navigate('/')
  };

  console.log(households);

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-800/20 to-transparent blur-2xl z-0"></div>

      <div className="overflow-y-scroll !h-64 scrollbar-hidden flex w-screen max-w-screen overflow-x-hidden min-h-screen flex-col items-center">
        <div className="px-15 py-4 z-10 w-full top-0 flex justify-between border-primary-foreground border-b-1 bg-[#0D0D1E]">
          <div className="flex flex-row gap-10">
            <Button className="!p-5 !transition-all duration-300 ease-in-out hover:-translate-x-1 hover:!bg-[#2e255c] !text-secondary !border-0.5 !bg-sidebar  !border-primary-foreground " type="button"
            onClick={() => {navigate('/dashboard')}}>
              <i className="ri-arrow-left-fill"></i> Back to Dashboard
            </Button>
            <div className="flex flex-row gap-4">
              <span className="bg-accent !h-10 justify-center items-center flex rounded-xl aspect-square">
                <i className="ri-settings-2-line text-2xl "></i>
              </span>
              <div className="flex flex-col">
                <h1 className="!text-3xl font-bold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent text-center">
                  Settings
                </h1>
              </div>
            </div>
          </div>
          <Button className=" !transition-all hover:!bg-[#2e255c] duration-500 ease-in-out !text-secondary  !bg-sidebar  h-12 w-12  !aspect-square  !border-primary-foreground">
            <i className="text-2xl ri-home-2-line"></i>
          </Button>
        </div>

        <div className="h-full w-fit mt-3 z-10 max-w-4xl">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Card className="bg-[#0D0D1E] p-10 border-primary-foreground">
              
              {/* Personal Information Section */}
              <div className="mb-8">
                <h1 className="!text-xl font-semibold bg-gradient-to-br from-white to-[#925AF6] bg-clip-text text-transparent mb-6">
                  Personal Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-primary-foreground">
                  <div className="flex flex-col gap-2">
                    <h2 className="!text-sm text-[#D1D5DB] font-semibold">
                      FULL NAME
                    </h2>
                    <Input
                      className="border-primary-foreground min-w-sm bg-input/30 focus:bg-input/50 transition-colors"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="!text-sm text-[#D1D5DB] font-semibold">
                      EMAIL
                    </h2>
                    <Input
                      className="border-primary-foreground min-w-sm bg-input/30 focus:bg-input/50 transition-colors"
                      placeholder="Eg: abc@def.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

    
              <div className="mb-8">
                <h1 className="!text-xl font-semibold bg-gradient-to-br from-white to-[#925AF6] bg-clip-text text-transparent mb-6">
                  Change Password
                </h1>
                <div className="grid grid-cols-1 gap-6 pb-8 border-b border-primary-foreground">
                  <div className="flex flex-col gap-2">
                    <h2 className="!text-sm text-[#D1D5DB] font-semibold">
                      CURRENT PASSWORD
                    </h2>
                    <Input
                      type="password"
                      className="border-primary-foreground min-w-sm bg-input/30 focus:bg-input/50 transition-colors"
                      placeholder="Enter your current password"
                      value={formData.oldPassword}
                      onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <h2 className="!text-sm text-[#D1D5DB] font-semibold">
                        NEW PASSWORD
                      </h2>
                      <Input
                        type="password"
                        className="border-primary-foreground min-w-sm bg-input/30 focus:bg-input/50 transition-colors"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="!text-sm text-[#D1D5DB] font-semibold">
                        CONFIRM NEW PASSWORD
                      </h2>
                      <Input
                        type="password"
                        className="border-primary-foreground min-w-sm bg-input/30 focus:bg-input/50 transition-colors"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                    </div>
                  </div>
                  {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <p className="text-red-400 text-sm">Passwords do not match</p>
                  )}
                </div>
              </div>

              {/* Household Management Section */}
              <div className="mb-8">
                <h1 className="!text-xl font-semibold bg-gradient-to-br from-white to-[#925AF6] bg-clip-text text-transparent mb-6">
                  Household Management
                </h1>
                <div className="pb-8 border-b border-primary-foreground">
                  <div className="flex flex-col gap-2 mb-4">
                    <h2 className="!text-sm !text-[#D1D5DB] font-semibold">
                      ACTIVE HOUSEHOLD
                    </h2>
                    <Select value={formData.activeHousehold} onValueChange={(value) => handleInputChange('activeHousehold', value)}>
                      <SelectTrigger className="w-full md:w-[300px] !bg-input/30 hover:!bg-input/50 !border-primary-foreground transition-colors">
                        <SelectValue placeholder="Select a household" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1534] border-primary-foreground">
                        {households.map((h) => (
                          <SelectItem 
                            key={h._id} 
                            value={h._id}
                            className="hover:bg-accent/20 focus:bg-accent/20"
                          >
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Switch between different households you're part of
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <Button 
                  type="submit"
                  className="!p-5 !bg-accent hover:!bg-accent/80 !text-white !border-accent transition-all duration-300 ease-in-out hover:scale-105 font-semibold"
                >
                  <i className="ri-save-line text-lg mr-2"></i>
                  Save Changes
                </Button>
              </div>

              <div className="flex flex-col">
                <h1 className="!text-xl font-semibold bg-gradient-to-br from-white to-[#925AF6] bg-clip-text text-transparent mb-6">
                  Session
                </h1>
                <div className="flex flex-col gap-2">
                  <Button 
                    type="button"
                    onClick={handleLogout}
                    className="!p-5 text-red-400 !border-red-500 !bg-red-700/20 hover:!bg-red-700/40 transition-all duration-300 ease-in-out max-w-40"
                  >
                    <i className="ri-logout-box-line text-lg font-extrabold mr-2"></i>
                    Logout
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Sign out of your HiveBoard account
                  </p>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;