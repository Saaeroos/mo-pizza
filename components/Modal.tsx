import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: "200px",
        opacity: 1,
        transition: { delay: 0.5 },
    },
};

interface Props {
    showModal: boolean;
    message: string;
}

export default function Modal({ showModal, message }: Props) {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="backdrop"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div className="modal" variants={modal}>
                        <p>{message}</p>
                        {!message && <p>Want to make another Pizza?</p>}
                        <Link href="/">
                            <button>Start Again</button>
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
