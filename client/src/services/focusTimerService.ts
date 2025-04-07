import api from "../axiosConfig";
import { FocusTimerRecord } from "../pages/FocusTimerPage";

export const fetchAddNewRecord = async (duration: FocusTimerRecord, csrfToken: string | null) => {
  try {
    const res = await api.post("/api/focusTimer/", duration, {
      headers: {
          "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    })
    return res.data;
  } catch (err) {
    console.log(err);
  }
}


export const fetchRecord = async () => {
  try {
    const res = await api.get("/api/focusTimer/", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}


export const msToISODuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `PT${hours}H${minutes}M${seconds}S`;
};


export const isoDurationToMs = (duration: string): number => {
  // Handle ISO 8601 format (PT0H0M27S)
  if (duration.startsWith('PT')) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
    
    const hours = parseInt(matches?.[1] || '0');
    const minutes = parseInt(matches?.[2] || '0');
    const seconds = parseInt(matches?.[3] || '0');
    
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }
  
  // Handle HH:MM:SS format
  if (duration.includes(':')) {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }
  
  //Backup
  return 0;
};