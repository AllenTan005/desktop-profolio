// import React from "react";
// import type { recentState, appState, itemState } from "../types/app";
import { useRecentStore } from "../store/recentStore";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import React, { useRef, useEffect, useState,useMemo } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
// interface DraggableProps {
//   axis?: 'both' | 'x' | 'y' | 'none';
//   bounds?: string | { left?: number; top?: number; right?: number; bottom?: number };
//   defaultClassName?: string;
//   defaultClassNameDragging?: string;
//   defaultClassNameDragged?: string;
//   defaultPosition?: { x: number; y: number };
//   position?: { x: number; y: number }; // 受控模式
//   positionOffset?: { x: number | string; y: number | string };
//   grid?: [number, number];
//   scale?: number;

//   handle?: string;   // CSS selector
//   cancel?: string;   // CSS selector
//   nodeRef?: React.RefObject<HTMLElement>; // 如果用 forwardRef

//   onStart?: (e: DraggableEvent, data: DraggableData) => void | false;
//   onDrag?: (e: DraggableEvent, data: DraggableData) => void | false;
//   onStop?: (e: DraggableEvent, data: DraggableData) => void | false;

//   children: React.ReactElement;
// }

type windowProps = {
  id: string;
  name: string;
  icon: string;
  zIndex: number;
  currentSlot?: string;
  windowOpen?: boolean;
  bringToFront: () => void;
};

const Window = ({ id, name, zIndex, windowOpen }: windowProps) => {
  const nodeRef = useRef(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [itemArray, setItemArray] = useState<any[]>([]);
  const [xyPosition, setXYPosition] = useState<{ x: number; y: number }>({
    x: 200,
    y: 50,
  });

  

  const [size, setSize] = useState({ width: 300, height: 200 });
  const { apps, openApp, closeApp, minimizeApp, bringAppToFront } =
    useRecentStore();

      const bounds = useMemo(() => {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth - size.width,
      bottom: window.innerHeight - size.height,
    };
  }, [size.width, size.height]);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    // console.log('handleDrag',e,data)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const elementWidth = 300; // 假設視窗寬度
    const elementHeight = 200; // 假設視窗高度

    let newX = data.x;
    let newY = data.y;

    // 限制 X
    if (newX < 0) newX = 0;
    if (newX > screenWidth - elementWidth) newX = screenWidth - elementWidth;

    // 限制 Y
    if (newY < 0) newY = 0;
    if (newY > screenHeight - elementHeight)
      newY = screenHeight - elementHeight;

    setXYPosition({ x: newX, y: newY });
  };

  const stopDrag = (id: any) => {
    // setActiveId(id)
  };

  const resizeWindow = (event: React.DragEvent<HTMLSpanElement>) => {

      let element = nodeRef.current;

      if (!element) return;

      const startX = event.clientX;
      const startY = event.clientY;
  
      const startWidth = parseInt(window.getComputedStyle(element as Element).width);
      const startHeight = parseInt(window.getComputedStyle(element as Element).height);

      console.log('startX', startX);
      console.log('startY', startY);

      const doDrag = (event: MouseEvent) => {
          (element as HTMLElement).style.width = startWidth + (event.clientX - startX) + "px";
          (element as HTMLElement).style.height = startHeight + (event.clientY - startY) + "px";
          event.preventDefault();
      };

      const stopDrag = (event: MouseEvent) => {
          document.documentElement.removeEventListener("mousemove", doDrag, false);
          document.documentElement.removeEventListener("mouseup", stopDrag, false);
      };

      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  

  useEffect(() => {
    console.log("itemArray", apps);
  }, [apps]);

  useEffect(() => {
    console.log("activeId", activeId);
  }, [activeId]);

  return (
    <div className="relative">
      {windowOpen ? (
       
        <div style={{ position: "absolute", zIndex: zIndex, left: xyPosition.x, top: xyPosition.y }}>
          <Draggable
            key={id}
            nodeRef={nodeRef}
            handle=".window-header"
            defaultPosition={{ x: xyPosition.x, y: xyPosition.y }}
           
            scale={1}
            bounds={bounds}
            onDrag={handleDrag} 
            onStart={() => bringAppToFront(id, zIndex)}
             onStop={(e, data) => {
            setXYPosition({ x: data.x, y: data.y });
              }}
          >
       
              <div ref={nodeRef} className=" relative will-change-transform bg-amber-600 rounded-md select-none">
                <div className="window-header flex items-center justify-between bg-amber-400 p-3 cursor-move rounded-t-md">
                  <div>
                    <button
                      className="rounded-full bg-red-500 w-5 h-5 mr-5"
                      onClick={() => closeApp(id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <button
                      className="rounded-full bg-green-500 w-5 h-5"
                      onClick={() => minimizeApp(id, windowOpen)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                  </div>

                  <span className="text-white font-bold">{name}</span>
                  <div style={{ width: "1.5rem" }}></div>
                </div>

                <p>This is {name}</p>
                <p>Zindex{zIndex}</p>
                <p>
                  x:{xyPosition.x} y:{xyPosition.y}
                </p>
                <div className="flex justify-end absolute right-0 bottom-0 cursor-nwse-resize">
                 <span onMouseDown={resizeWindow}>
                  <svg width="36" height="42" viewBox="0 0 76 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 79H26C51.9574 79 73 57.9574 73 32V3" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                  </span>
                </div>
             
                {/* 可以放內容 */}
              </div>
          
          </Draggable>
        </div>
      ) : null}
    </div>
  );
};

export default Window;
