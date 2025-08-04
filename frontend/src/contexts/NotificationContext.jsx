import { useContext, createContext } from "react";

export const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};
