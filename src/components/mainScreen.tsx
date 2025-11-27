import { useEffect, useState } from "react";
import {
  DndContext,
  type DragEndEvent, // Type for the onDragEnd event object
  type DragStartEvent, // Type for onDragStart
  type DragOverEvent, // Type for onDragOver
  type UniqueIdentifier, // Type for the active/over.id property
  type CollisionDetection, // Type for collisionDetection prop
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors, // For sensors
} from "@dnd-kit/core";
import Draggable from "./Draggable";
import { Droppable } from "./Droppable";
import folder from '../assets/folder.svg'
import ieIcon from '../assets/IE.svg'
import chromeIcon from '../assets/chrome.svg'
import BottomBar from "./bottomBar";
import Window from "./window";
import { useRecentStore } from "../store/recentStore";
import type { itemState } from "../types/app";

type ZoneId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type SlotId = `${ZoneId}-${number}`;

const SLOT_COUNT = 7;

const mainScreen = () => {

  const { apps} = useRecentStore();

  const [maxZIndex, setMaxZIndex] = useState(1);


  const generateSlots = (zone: ZoneId): SlotId[] =>
  Array.from({ length: SLOT_COUNT }, (_, i) => `${zone}-${i}` as SlotId);

    const [items, setItems] = useState<itemState[]>([
        { id: "1", name: "folder", icon:folder, currentSlot: "A-3", windowOpen:false,zIndex: 1 },
        { id: "2", name: "internet explorer", icon:ieIcon, currentSlot: "A-2",windowOpen:false,zIndex: 1 },
        { id: "3", name: "chrome", icon:chromeIcon,  currentSlot: "A-5",windowOpen:false,zIndex: 1 },
    ]);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const newSlot = over.id as SlotId;

    setItems((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? {
              ...item,
              currentSlot: newSlot,
            }
          : item
      )
    );
  };

  const bringToFront = (id:any) => {
    setMaxZIndex((prev) => prev + 1);
    // console.log('bringToFront',id)
    let toNum = Number(id)
    setItems((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, zIndex: maxZIndex + 1 } : win
      )
    );

  }

    const renderZone = (zoneId: ZoneId) => {
    const slots = generateSlots(zoneId);

    return (
      <div
        style={{
          flex: 1,
          height: "90vh",
          //padding: "16px",
          boxSizing: "border-box",
          backgroundColor: "#0000",
        }}
      >
        {/* <h3 style={{ textAlign: "center" }}>Zone {zoneId}</h3> */}
        {slots.map((slotId) => {
          const item = items.find((item) => item.currentSlot === slotId) || null;
          return <Droppable key={slotId} item={item} id={slotId}  />;
        })}
      </div>
    );
  };

  const renderWindow = () => {

      return(
        apps.map((item) =>{
           return  <Window {...item} key={item.id}  bringToFront={() => bringToFront(item.id)}/>
        })
      )

  }


useEffect(() =>{
  // console.log('check item if change',items)
},[items])


useEffect(() =>{
    renderWindow()    
},[apps])

  return (
    <div className="max-h-screen overflow-hidden">
    
        <div className="">
           {renderWindow()}
        </div>
        <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex" }}>
        {renderZone("A")}
        {renderZone("B")}
        {renderZone("C")}
        {renderZone("D")}
        {renderZone("E")}
        {renderZone("F")}
        {renderZone("G")}
        {renderZone("H")}
      </div>
        </DndContext>
          <div className="">
              <BottomBar />
           </div>
    </div>
  );
};

export default mainScreen;
