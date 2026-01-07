import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormContext } from "../../contexts/FormContext";

const colors = [
  "bg-[#FEC971]",
  "bg-[#FE9B72]",
  "bg-[#B994FD]",
  "bg-[#00D5FB]",
  "bg-[#E3EF8F]",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Animates out in reverse
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

const LeftAside = () => {
  const [isVisible, setIsVisible] = useState(false);

  const formContext = useContext(FormContext);

  if (!formContext) return null;

  const { setSelectedColor, setShowCard } = formContext;

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h3 className="font-bold text-2xl text-center mt-10">Sticky </h3>
      <div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(!isVisible)}
          className=" mt-16  border items-center flex  mx-auto p-2 rounded-full bg-black text-white"
        >
          {isVisible ? (
            <motion.span
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.5,
              }}
            >
              <div>
                <Plus size={30} />
              </div>
            </motion.span>
          ) : (
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: 90 }}>
              <div>
                <Plus size={30} />
              </div>
            </motion.span>
          )}
        </motion.button>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid  gap-3 mt-10 w-full max-w-md"
            >
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => {
                    handleColorSelect(color);
                    setShowCard(true);
                    setIsVisible(false);
                  }}
                  className={`size-6 items-center flex justify-center mx-auto rounded-full shadow-md ${color}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeftAside;
