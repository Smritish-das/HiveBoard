import {  } from 'react'
import { Button } from '@/components/ui/button'
import HouseholdTabs from '@/components/HouseholdTabs'
import { useNavigate } from 'react-router-dom'

const Houshold = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='absolute inset-0 bg-gradient-to-b from-violet-800/20 to-transparent blur-2xl z-0'></div>
       <div className='overflow-y-scroll !h-64 scrollbar-hidden flex w-screen max-w-screen overflow-x-hidden min-h-screen flex-col '>
      
      <div className='px-15 py-3 z-10 w-full top-0 flex justify-between border-primary-foreground border-b-1 bg-[#0D0D1E]'>
        <div className='flex flex-row gap-10'>
          <Button onClick={() => navigate('/dashboard')} className='!p-5 !transition-all duration-300 ease-in-out hover:-translate-x-1 hover:!bg-[#2e255c] !text-secondary !border-0.5 !bg-sidebar  !border-primary-foreground '><i class="ri-arrow-left-fill"></i> Back to Dashboard</Button>
          <div className='flex flex-row gap-4'>
            <span className='bg-accent !h-12 justify-center items-center flex rounded-xl aspect-square'><i class="ri-home-2-line text-3xl "></i></span>
          <div className='flex flex-col'>
            <h1 className="!text-3xl font-bold bg-gradient-to-br from-white to-[#a356f6] bg-clip-text text-transparent text-center">Command Center</h1>
            <p className='text-muted-foreground text-sm'>4 active members</p>
          </div>
          </div>
        </div>
        <Button className='!transition-all hover:!bg-[#2e255c] duration-500 ease-in-out !text-secondary hover:rotate-90  !bg-sidebar  h-12 w-12  !aspect-square  !border-primary-foreground'><i class="text-2xl ri-settings-2-line" onClick={() => navigate('/settings')}></i></Button>
      </div>
      <div className=' h-full z-10 p-[14%]  pt-0'>
        <HouseholdTabs></HouseholdTabs>
      </div>
    </div>
    </>
   
  )
}

export default Houshold