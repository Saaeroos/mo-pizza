import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppContext, { AppState } from "../../context";
import Modal from "../../components/Modal";

const containerVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
        transition: {
            staggerChildren: 0.5,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.4,
            when: "beforeChildren",
        },
    },
};

const childVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

const moFavoritePizza = {
    base: "Thick Crust",
    topping: ["mushrooms", "olives", "extra cheese", "tomatoes"],
};

export default function Order() {
    // useEffect lifecycle hook, array with only setShowModal as dep
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const calculateAccuracy = (state: AppState) => {
        let percentage = 0;
        if (state.base === moFavoritePizza.base) {
            percentage += 20;
        }
        state.topping.filter((t) => {
            if (moFavoritePizza.topping.includes(t)) {
                percentage += 20;
                return;
            }
            percentage -= 16.7;
        });

        percentage = Math.floor(Math.max(0, percentage));

        if (percentage === 100) {
            setSuccess(true);
        }

        return `${percentage}%`;
    };

    const successMessage = () => {
        if (success) return "You are a pizza wizard!!";

        return "";
    };

    useEffect(() => {
        setTimeout(() => setShowModal(true), 5000);
    }, [setShowModal]);

    return (
        <AppContext.Consumer>
            {({ state, handleChangeState }) => (
                <>
                    <motion.div
                        className="container order"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2>Thank you for playing :)</h2>
                        <motion.p variants={childVariants}>
                            Your choice is a {state.base} pizza with:
                        </motion.p>
                        <motion.div variants={childVariants}>
                            {state.topping.map((topping) => (
                                <div key={topping}>{topping}</div>
                            ))}
                        </motion.div>
                        <motion.div variants={childVariants}>
                            <p>Accuracy is {calculateAccuracy(state)}</p>
                        </motion.div>
                    </motion.div>
                    <Modal
                        showModal={showModal}
                        message={successMessage()}
                    ></Modal>
                </>
            )}
        </AppContext.Consumer>
    );
}
