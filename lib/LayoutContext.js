"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLayout } from "@/lib";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layoutData, setLayoutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLayout();
      setLayoutData(data);
    };

    fetchData();
  }, []);

  return (
    <LayoutContext.Provider value={layoutData}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};
