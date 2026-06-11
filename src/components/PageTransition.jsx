import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -4 },
}

const transition = { duration: 0.22, ease: [0.4, 0, 0.2, 1] }

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
