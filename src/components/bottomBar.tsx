
import folder from '../assets/folder.svg'
import { useRecentStore } from "../store/recentStore";
import type { recentState, appState } from "../types/app";

const bottomBar = () => {

      const { apps, openApp, closeApp, minimizeApp,reOpenApp } = useRecentStore();



  return (
    <div className='w-[100%] h-[10vh]   p-2 bg-amber-200 opacity-50'>
   
        <div className='w-[100%] flex justify-center'>
         {apps.map((item:appState) => (
          <div key={item.id} className='w-[10%] flex flex-col items-center justify-center'
          onClick={() => reOpenApp(item.id, item.windowOpen ?? false)}
          >
            <img src={item.icon} className='w-[30%]' alt="" />
             
            </div>
           ))}

      </div>
    </div>
  )
}

export default bottomBar
