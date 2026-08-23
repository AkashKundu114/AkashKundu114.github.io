import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 10, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.995 },
};

const transition = { duration: 0.24, ease: [0.4, 0, 0.2, 1] };

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
