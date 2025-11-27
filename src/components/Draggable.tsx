import { useDraggable } from "@dnd-kit/core";
import { useRecentStore } from "../store/recentStore";
//import {CSS} from '@dnd-kit/utilities';
import type { recentState, appState } from "../types/app";
import { useEffect } from "react";

function Draggable(item:any) {
  const { apps, openApp, closeApp, minimizeApp } = useRecentStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined, // Applies the drag transform
    // Add other styling as needed

    margin: "5px",
    // border: '1px solid gray',
    //backgroundColor: 'lightblue',
    borderRadius: "4px",
    cursor: "grab",
    width: "5rem",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  };

  const handleOpenApp = (app: appState) => {
    openApp({ ...app, currentSlot: "", windowOpen:true });
  };

  // useEffect(() =>{
  //   console.log('apps in useEffect',apps)
  // },[apps])

  return (
    <div>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes} onDoubleClick={() => handleOpenApp(item)}>
        <img src={item.icon} className="w-[2rem]" alt="" />
        <p className="w-[100%] whitespace-pre-wrap">{item.name}</p>
      </button>
    </div>
  );
}

export default Draggable;
