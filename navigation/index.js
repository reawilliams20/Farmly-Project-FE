import React from "react";
import { UserProvider } from "./user";
import Routers from "./Routers";

const Providers = () => {
  return (
    <UserProvider>
      <Routers />
    </UserProvider>
  );
};

export default Providers;
