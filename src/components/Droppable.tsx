
import {useDroppable} from '@dnd-kit/core';
import Draggable from "./Draggable";
import { useState,useEffect } from 'react';



export function Droppable({ id, item  }:any) {
  const {isOver, setNodeRef} = useDroppable({
    id
  });
   const style: React.CSSProperties = {
      height: "13vh",
    // border: "2px dashed gray",
    // background: isOver ? "#d2f8d2" : "#D9D9D9",
    background:'#D9D9D9',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //margin: "8px",
    // borderRadius: "6px",
  };



  // useEffect(() =>{
  //   console.log('items',item,id)
  // },[])

  return (
    <div ref={setNodeRef} style={style}>
 
     {item && <Draggable {...item} />}
    </div>
  );
}
  