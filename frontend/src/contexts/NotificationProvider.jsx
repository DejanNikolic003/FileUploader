import { message } from "antd";
import { NotificationContext } from "./NotificationContext";
export const NotificationProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const createNotification = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
