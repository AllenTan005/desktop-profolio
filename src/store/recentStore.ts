import { create } from "zustand";
import type { recentState, appState } from "../types/app";



export const useRecentStore = create<recentState>((set) =>({
    apps:[],
    biggestZindex:null,

        openApp: (newApp: appState) =>
         set((state) => {
            
            if(state.apps.some(app => app.id === newApp.id)){
                 console.warn(`App with ID "${newApp.id}" is already open.`);
                 return {
                    apps: state.apps.map(app =>
                        app.id === newApp.id ? { ...app, currentSlot: newApp.currentSlot,
                             windowOpen:newApp.windowOpen  } : app
                    )
                 };
            }
            return {
                apps: [...state.apps, newApp]
            };
    }),



    closeApp: (appId:string) => set((state) =>({
        apps:state.apps.filter((app) => app.id !== appId)
    })),

    minimizeApp: (appId: string, windowOpen:boolean, slot?: string) => set((state) =>({
    //   const windowState = !windowOpen
        apps:state.apps.map((app) =>
        app.id === appId
          ? { ...app, currentSlot: slot, windowOpen:false } 
          : app
    )
    })),

      reOpenApp: (appId: string, windowOpen:boolean, slot?: string) => set((state) =>({
    //   const windowState = !windowOpen
        apps:state.apps.map((app) =>
        app.id === appId
          ? { ...app, currentSlot: slot, windowOpen:true } 
          : app
    )
    })),

    bringAppToFront:(appId: string, zIndex:number) => set((state) =>({

          biggestZindex: state.apps.reduce((maxZIndex,currentItem) =>{
                return Math.max(maxZIndex, currentItem.zIndex)
             },-Infinity),

        //   apps:state.apps.map((app) =>
        //      app.id === appId ? { ...app,zIndex: biggestZindex + 1} : app
        //   )

           apps:state.apps.map((app) =>
             app.id === appId ? { ...app, zIndex: state.apps.reduce((maxZIndex, currentItem) => 
                Math.max(maxZIndex, currentItem.zIndex), -Infinity) + 1 } : app
          )
    }))


}))

