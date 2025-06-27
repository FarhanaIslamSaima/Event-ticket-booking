"use client"
import { ThemeProvider } from "@mui/material";
import React from "react";

import { Provider } from "react-redux";
import { store } from "@/Redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store} >
            
                {children}
          
        </Provider>
    );
};

export default Providers;