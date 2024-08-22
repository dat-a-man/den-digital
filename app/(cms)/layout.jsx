import React from "react";

export const metadata = {
  title: "Dashboard | Data Engineering News",
  robots: {
    index: false,
    follow: true,
  },
};

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
