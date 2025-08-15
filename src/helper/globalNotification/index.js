import React, { createContext, useContext, useRef } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext(null);

export const useGlobalNotification = () => useContext(NotificationContext);

const GlobalNotification = ({ children }) => {
  const apiRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  apiRef.current = api;

  const openNotification = (config) => apiRef.current?.open(config);

  const info = (config) => apiRef.current?.info(config);
  const success = (config) => apiRef.current?.success(config);
  const error = (config) => apiRef.current?.error(config);
  const warning = (config) => apiRef.current?.warning(config);

  return (
    <NotificationContext.Provider value={{ openNotification, info, success, error, warning }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default GlobalNotification;