import { motion } from 'framer-motion';

export default function Button({
  type = 'button',
  handleClick,
  label,
}: {
  type?: 'submit' | 'button' | 'reset' | undefined;
  handleClick?: () => void;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      type={type}
      style={{
        cursor: 'pointer',
      }}
    >
      {label}
    </motion.button>
  );
}
