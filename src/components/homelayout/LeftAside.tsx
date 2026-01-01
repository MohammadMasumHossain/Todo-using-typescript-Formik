import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormContext } from "../../contexts/FormContext";

const colors =[
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
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
    hidden:{y:20 , opacity:0},
    visible:{y:0, opacity:1},
    exit:{y:20, opacity:0},
};
 


const LeftAside = () => {

    const [isVisible, setIsVisible] = useState(false);

    const formContext=useContext(FormContext);

    if(!formContext) return null;

    const { setSelectedColor } = formContext;

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

   
     
    return (
        <div>
          <h3 className="font-bold text-xm text-center mt-10">Sticky </h3>
          <motion.div
          animate={{ rotateX: 180 }}
           transition={{
            type: "spring",
            visualDuration: 0.5,
             bounce: 0.5
            }}
          >
            <motion.button
             whileTap ={{ scale: 0.9 }}
            onClick={() => setIsVisible(!isVisible)}
             className=" mt-16  border items-center flex  mx-auto p-2 rounded-full bg-black text-white">
            {isVisible ? (
                <motion.span
                 initial={{ rotate: 90 }}
                 animate={{ rotate: 0 }}
                 transition={{ duration: 0.3, type: "spring", visualDuration: 0.5, bounce: 0.5 }}
                >
                  <Plus size={30} />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.3, type: "spring", visualDuration: 0.5, bounce: 0.5 }}
                >
                  <Plus size={30} />
                </motion.span>
              )     }
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
                onClick={()=>{
                  handleColorSelect(color);
                  // setIsVisible(false);
                }}
                className={`size-6 items-center flex justify-center mx-auto rounded-full shadow-md ${color}`}
              />
            ))}
          </motion.div>
        )}
          </AnimatePresence>
          </motion.div>

          

        </div>
    );
};

export default LeftAside;