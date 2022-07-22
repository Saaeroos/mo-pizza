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

interface Props {
    addTopping: any;
    pizza: any;
}

export default function Toppings({ addTopping, pizza }: Props) {
    let toppings = [
        "mushrooms",
        "peppers",
        "onions",
        "olives",
        "extra cheese",
        "tomatoes",
    ];

    return (
        <AppContext.Consumer>
            {({ state, handleChangeState }) => (
                <motion.div
                    className="toppings container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <h3>Step 2: Guess the Toppings</h3>
                    <ul>
                        {toppings.map((topping) => {
                            let spanClass = state.topping.includes(topping)
                                ? "active"
                                : "";
                            return (
                                <motion.li
                                    key={topping}
                                    onClick={() => {
                                        let newToppings: string[] = [];

                                        if (state.topping.includes(topping)) {
                                            newToppings = state.topping.filter(
                                                (t) => t !== topping
                                            );
                                            handleChangeState({
                                                ...state,
                                                topping: newToppings,
                                            });

                                            return;
                                        }

                                        newToppings =
                                            state.topping.concat(topping);

                                        handleChangeState({
                                            ...state,
                                            topping: newToppings,
                                        });
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
                                    <span className={spanClass}>{topping}</span>
                                </motion.li>
                            );
                        })}
                    </ul>
                    <Link href="/order">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            Order
                        </motion.button>
                    </Link>
                </motion.div>
            )}
        </AppContext.Consumer>
    );
}
