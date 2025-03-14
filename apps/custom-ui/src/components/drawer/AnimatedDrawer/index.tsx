import { motion, useCycle } from "framer-motion";
import { Navigation } from "./Navigation";
import { ComponentProps } from "react";

const Path = (props: ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const AnimatedDrawer = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"} // control animation state from one place which will also be applied to children via variants
      className="absolute inset-0 w-72"
    >
      {/* bg color */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 top-0 w-72 bg-blue-300"
        variants={{
          open: {
            clipPath: `circle(2200px at 40px 40px)`,
            transition: {
              type: "spring",
              stiffness: 20,
              restDelta: 2,
            },
          },
          closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
              delay: 0.3,
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
          },
        }}
      ></motion.div>
      <button
        className={`menu-button absolute left-7 top-8 cursor-pointer bg-transparent`}
        onClick={() => toggleOpen()}
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
      <Navigation />
    </motion.nav>
  );
};
