"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CursorType = "thunder" | "hinokami" | "beast" | "none";

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursorType, setCursorType] = useState<CursorType>("thunder");

    // Load saved cursor preference on mount
    useEffect(() => {
        const savedCursor = localStorage.getItem("cursorType") as CursorType;
        if (savedCursor) {
            setCursorType(savedCursor);
        }
    }, []);

    const handleSetCursorType = (type: CursorType) => {
        setCursorType(type);
        localStorage.setItem("cursorType", type);
    };

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType: handleSetCursorType }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
