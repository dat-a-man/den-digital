"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLayout } from "@/lib";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layoutData, setLayoutData] = useState(null);
  const [userIp, setUserIp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setUserIp(result.visitorId);
    };

    getFingerprint();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchLayout();
      setLayoutData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        layoutData,
        userIp,
        loading,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};
