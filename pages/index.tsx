import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import AppContext from "../context";

const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: 5,
        },
    },
};

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 1.5, duration: 1.5 },
    },
    exit: {
        x: "-100vh",
        transition: { ease: "easeInOut" },
    },
};

export default function Home() {
    return (
        <AppContext.Consumer>
            {({ state, handleChangeState }) => (
                <motion.div
                    className="home container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <h2>Welcome to Mo's Pizza</h2>
                    <p>Let's see if you can guess my favorite pizza</p>
                    <Link href="/base">
                        <motion.button
                            className="buttonBig"
                            variants={buttonVariants}
                            whileHover="hover"
                            onClick={() =>
                                handleChangeState({ base: "", topping: [] })
                            }
                        >
                            Start the game
                        </motion.button>
                    </Link>
                    <Loader />
                </motion.div>
            )}
        </AppContext.Consumer>
    );
}
