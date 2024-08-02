"use client";

import EditBanner from "./EditBanner";

type DialogProviderProps = {
  children: React.ReactNode;
};

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  return (
    <>
      <EditBanner />
      {children}
    </>
  );
};

export default DialogProvider;
