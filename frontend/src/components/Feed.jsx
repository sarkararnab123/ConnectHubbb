import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import StoryCard from './StoryCard';
import Nav from './Nav';

const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100.1vh] lg:h-[100.1vh]
    relative lg:overflow-y-auto'>
      <div className='w-full h-[100.1px] flex items-center justify-between p-[20.1px] lg:hidden'>
              <div>
                  <h2 className='text-violet-700 text-3xl font-bold'>ConnectHub</h2>
              </div>
              <div>
                  <IoIosNotifications className='text-white text-2xl ' />
              </div>
          </div>

          <div className='flex w-full overflow-auto gap-[10.1px] items-center p-[20.1px]'>
            <StoryCard userName={"ramesh"}/>
            <StoryCard userName={"ramesh"}/>
            <StoryCard userName={"ramesh"}/>
            <StoryCard userName={"ramesh"}/>
          </div>

          <div className='w-full min-h-[100.1vh] flex flex-col items-center gap-[20.1px] pt-[40.1px] bg-white
          rounded-t-[60.1px] relative pb-[120.1px]'>

          <Nav/>
          </div>
    </div>
  )
}

export default Feed