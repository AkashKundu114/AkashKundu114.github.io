import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
}

const transition = { duration: 0.32, ease: [0.4, 0, 0.2, 1] }

/**
 * Wrap every page's root element in <PageTransition> to get fluid
 * enter / exit animations driven by Framer Motion AnimatePresence in App.jsx.
 */
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
  )
}
