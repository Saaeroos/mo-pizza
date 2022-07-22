import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AppContext from "../../context";

const containerVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", delay: 0.5 },
    },
    exit: {
        x: "-100vh",
        transition: { ease: "easeInOut" },
    },
};

const nextVariants = {
    hidden: {
        x: "-100vw",
    },
    visible: {
        x: 0,
        transition: { type: "spring", stiffness: 120 },
    },
};

const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: Infinity,
        },
    },
};

export default function Base() {
    const bases = ["Classic", "Thin & Crispy", "Thick Crust"];

    return (
        <AppContext.Consumer>
            {({ state, handleChangeState }) => (
                <motion.div
                    className="base container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <h3>Step 1: Guess The Base</h3>
                    <ul>
                        {bases.map((base) => {
                            let spanClass = base === state.base ? "active" : "";
                            return (
                                <motion.li
                                    key={base}
                                    onClick={() => {
                                        handleChangeState({ ...state, base });
                                    }}
                                    whileHover={{
                                        scale: 1.3,
                                        originX: 0,
                                        color: "#f8e112",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <span className={spanClass}>{base}</span>
                                </motion.li>
                            );
                        })}
                    </ul>

                    {state.base && (
                        <motion.div className="next" variants={nextVariants}>
                            <Link href="/toppings">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                >
                                    Next
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AppContext.Consumer>
    );
}
