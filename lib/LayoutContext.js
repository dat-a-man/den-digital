"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLayout } from "@/lib";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layoutData, setLayoutData] = useState(null);
  const [userIp, setUserIp] = useState(null);

  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      console.log("User IP address: ", data.ip);
      setUserIp(data.ip);
    } catch (error) {
      console.error("Error fetching user IP address: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLayout();
      setLayoutData(data);
    };

    getIpAddress();
    fetchData();
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        layoutData,
        userIp,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};
