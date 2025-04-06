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


export const msToISODuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `PT${hours}H${minutes}M${seconds}S`;
};