import { motion } from "framer-motion";

export default function GlassCard({ children, delay = 0 }) {
  return (
    <motion.div
      className="glass-card rounded"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
