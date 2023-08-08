import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function AnimatedSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState("");

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const selectedText = e.target.textContent;
      setSelect(selectedText || "");
    }
  };

  return (
    <>
      <div className="bg-gray-600 p-2">
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"} // set variant state
          className="relative inline-block"
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            Animated Menu
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </motion.div>
          </motion.button>
          <motion.ul
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.35, // make li to wait untill ul is finished halfway
                  staggerChildren: 0.05,
                },
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)", // control initial state of animation. e.g. do not show 90% from bottom
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
              },
            }}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
            className="absolute z-10 mt-2 w-full bg-gray-100" // By setting the ul element's position as "absolute," it is removed from the normal document flow, allowing it to overlap other elements without affecting their placement.
          >
            <motion.li
              variants={itemVariants}
              onClick={handleSelect}
              className="cursor-pointer py-1 pl-2  hover:bg-gray-200"
            >
              Item 1
            </motion.li>
            <motion.li
              variants={itemVariants}
              onClick={handleSelect}
              className="cursor-pointer py-1 pl-2  hover:bg-gray-200"
            >
              Item 2
            </motion.li>
            <motion.li
              variants={itemVariants}
              onClick={handleSelect}
              className="cursor-pointer py-1 pl-2  hover:bg-gray-200"
            >
              Item 3
            </motion.li>
            <motion.li
              variants={itemVariants}
              onClick={handleSelect}
              className="cursor-pointer py-1 pl-2  hover:bg-gray-200"
            >
              Item 4
            </motion.li>
            <motion.li
              variants={itemVariants}
              onClick={handleSelect}
              className="cursor-pointer py-1 pl-2  hover:bg-gray-200"
            >
              Item 5
            </motion.li>
          </motion.ul>
        </motion.nav>
      </div>
      <div>Selected: {select}</div>
    </>
  );
}
