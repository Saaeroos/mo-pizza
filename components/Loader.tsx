import React, { useState } from "react";
import { motion, useCycle } from "framer-motion";

const loaderVariants = {
    animationOne: {
        x: [-20, 20],
        y: [0, -30],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 1,
            },
            y: {
                yoyo: Infinity,
                duration: 0.25,
                ease: "easeOut",
            },
        },
    },
    animationTwo: {
        y: [0, -40],
        x: 0,
        transition: {
            y: {
                yoyo: Infinity,
                duration: 0.4,
                ease: "easeOut",
            },
        },
    },
    animationThree: {
        y: 0,
        x: 0,
    },
};

export default function Loader() {
    const [showHint, setShowHint] = useState(false);
    const [animation, cycleAnimation] = useCycle(
        "animationOne",
        "animationTwo",
        "animationThree"
    );

    return (
        <>
            <motion.div
                onClick={() => cycleAnimation()}
                className="loader"
                variants={loaderVariants}
                animate={animation}
            ></motion.div>
            <p>make the ball stop if you can</p>
            <button
                className="smallBtn"
                onClick={() =>
                    showHint ? setShowHint(false) : setShowHint(true)
                }
            >
                {showHint ? "Click the ball" : "Give me a hint"}
            </button>
        </>
    );
}
