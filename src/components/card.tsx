import { motion } from 'framer-motion';

export default function Card({ label }: { label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        cursor: 'pointer',
        width: 50,
        height: 50,
      }}
    >
      {label}
    </motion.button>
  );
}
