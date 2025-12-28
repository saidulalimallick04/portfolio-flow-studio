"use client";

import { motion } from "framer-motion";
import { BottomNav } from "./BottomNav";
import { MusicPlayer } from "./MusicPlayer";

export function BottomControls() {
    return (
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-4 pointer-events-none">
            {/* Bottom Nav - The "Mothership" */}
            <motion.div
                initial={{ y: 50, width: "50px", opacity: 0, borderRadius: "25px" }}
                animate={{ y: 0, width: "auto", opacity: 1, borderRadius: "50px" }}
                transition={{
                    y: { duration: 0.6, type: "spring", bounce: 0.5 },
                    width: { duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 },
                    opacity: { duration: 0.4 }
                }}
                className="pointer-events-auto overflow-hidden"
            >
                <BottomNav />
            </motion.div>

            {/* Play Button - The "Satellite" detaching */}
            <motion.div
                initial={{ x: -60, scale: 0, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.6,
                    delay: 0.6 // Wait for nav spread to finish
                }}
                className="pointer-events-auto"
            >
                <MusicPlayer />
            </motion.div>
        </div>
    );
}
