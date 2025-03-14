import { motion } from "framer-motion";

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const Navigation = () => (
  <motion.ul
    variants={{
      open: {
        visibility: "visible",
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
      },
      closed: {
        visibility: "hidden",
        transition: {
          staggerChildren: 0.02, // schedule children so that they animate at different time
          delay: 0.3, // wait for children to animate out before hiding
          staggerDirection: -1,
        },
      },
    }}
    className="absolute top-[100px] w-[230px] p-6"
  >
    {itemIds.map((i) => (
      <motion.li
        key={i}
        variants={{
          open: {
            y: 0,
            opacity: 1,
            transition: {
              y: { stiffness: 1000, velocity: -100 },
            },
          },
          closed: {
            y: 50,
            opacity: 0,
            transition: {
              y: { stiffness: 1000 },
            },
          },
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mb-5 flex cursor-pointer items-center gap-5"
      >
        <div
          className="icon-placeholder  h-[40px] w-[40px] flex-shrink-0 rounded-full "
          style={{ border: `2px solid ${colors[i]}` }}
        />
        <div
          className="text-placeholder  h-5 w-full rounded-md"
          style={{ border: `2px solid ${colors[i]}` }}
        />
      </motion.li>
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
