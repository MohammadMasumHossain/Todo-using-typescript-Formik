import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormContext } from "../../contexts/FormContext";

const colors = [
  "bg-[#FFCA68]",
  "bg-[#FF9C6F]",
  "bg-[#B78FFF]",
  "bg-[#00D3FF]",
  "bg-[#E4EF88]",
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
      <h3 className="hidden lg:block font-bold text-2xl text-center mt-10">
        Sticky
      </h3>
      <div className="">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(!isVisible)}
          // className="fixed lg:static bottom-16 left-1/2 -translate-x-1/2 lg:translate-x-7 lg:mt-16 transform  flex items-center justify-center bg-black text-white p-4 rounded-full shadow-lg z-40"
          className=" left-1/2 flex  lg:items-center lg:justify-center fixed lg:static bg-black -ml-6 -lg:ml-0 text-white bottom-24 md:bottom-16 p-2 rounded-full  lg:mx-auto z-40 lg:mt-16"
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
              <div className="">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="  fixed inset-0 z-30"
              onClick={() => setIsVisible(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              // className="fixed lg:absolute bottom-32 lg:top-32 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 flex flex-row lg:flex-col gap-4 bg-gray-200 lg:bg-white p-4 rounded-xl shadow-lg z-40 "
              className="fixed lg:absolute bottom-40 md:bottom-32 lg:bottom-auto left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-13 flex flex-row lg:flex-col gap-4 bg-white p-4 lg:bg-white rounded-xl shadow-l z-40"
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
                  // className={`w-6 h-6 rounded-full cursor-pointer shadow-md ${color}`}
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

// import { Plus } from "lucide-react";
// import { useContext, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { FormContext } from "../../contexts/FormContext";

// // COLOR OPTIONS
// const colors = [
//   "bg-[#FFCA68]",
//   "bg-[#FF9C6F]",
//   "bg-[#B78FFF]",
//   "bg-[#00D3FF]",
//   "bg-[#E4EF88]",
// ];

// // ANIMATION VARIANTS
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
//   exit: {
//     opacity: 0,
//     transition: { staggerChildren: 0.05, staggerDirection: -1 },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 },
//   exit: { y: 20, opacity: 0 },
// };

// const LeftAside = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const formContext = useContext(FormContext);
//   if (!formContext) return null;

//   const { setSelectedColor, setShowCard } = formContext;

//   const handleColorSelect = (color: string) => {
//     setSelectedColor(color);
//   };

//   return (
//     <>
//       {/* DESKTOP TITLE */}
//       <h3 className="hidden lg:block font-bold text-2xl text-center mt-10">
//         Sticky
//       </h3>

//       {/* OVERLAY - GRAY BACKGROUND */}
//       <AnimatePresence>
//         {isVisible && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 z-30" // CHANGED: added gray overlay
//             onClick={() => setIsVisible(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* PLUS BUTTON */}
//       <motion.button
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsVisible(!isVisible)}
//         className="
//           fixed lg:static         /* CHANGED: fixed for mobile, static for desktop */
//           bottom-16 lg:bottom-auto
//           left-1/2 lg:left-auto
//           -translate-x-1/2 lg:translate-x-0   /* CHANGED: center horizontally on mobile */
//           flex items-center justify-center
//           bg-black text-white
//           p-4 rounded-full shadow-lg       /* CHANGED: added proper shadow */
//           z-40
//         "
//       >
//         <motion.span
//           animate={{ rotate: isVisible ? 0 : 90 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <Plus size={30} />
//         </motion.span>
//       </motion.button>

//       {/* COLOR PALETTE */}
//       <AnimatePresence>
//         {isVisible && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="
//               fixed lg:absolute                 /* CHANGED: fixed on mobile, absolute on desktop */
//               bottom-32 lg:top-32                /* CHANGED: palette above plus on mobile, top on desktop */
//               left-1/2 lg:left-auto              /* CHANGED: center on mobile, left auto on desktop */
//               -translate-x-1/2 lg:translate-x-0  /* CHANGED: horizontal center mobile */
//               flex flex-row lg:flex-col gap-4
//               bg-gray-200 lg:bg-white            /* CHANGED: gray background on mobile, white on desktop */
//               p-4 rounded-xl shadow-lg
//               z-40
//             "
//           >
//             {colors.map((color, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => {
//                   handleColorSelect(color);
//                   setShowCard(true);
//                   setIsVisible(false); // CHANGED: auto-close palette after selecting color
//                 }}
//                 className={`w-6 h-6 rounded-full cursor-pointer shadow-md ${color}`} // CHANGED: size fixed
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default LeftAside;
