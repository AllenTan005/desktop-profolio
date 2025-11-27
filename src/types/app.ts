export interface appState {
    id: string;
    name: string;
    icon: string;
    currentSlot?:string;
    windowOpen?:boolean | undefined;
    zIndex:number
    // bringToFront: () => void;
}

export interface recentState {
    apps:appState[];
    biggestZindex:number | null
    openApp:(newApp: appState) => void;
    closeApp:(appId: string) => void;
    minimizeApp:(appId: string, windowOpen:boolean, slot?: string) => void;
    reOpenApp:(appId: string, windowOpen:boolean, slot?: string) => void;
    bringAppToFront:(appId: string, zIndex:number, slot?: string) => void;
}

type ZoneId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type SlotId = `${ZoneId}-${number}`;

export interface itemState {
  id: string;
  name: string;
  icon: string;
  currentSlot: SlotId;
  windowOpen:boolean;
  zIndex:number
}