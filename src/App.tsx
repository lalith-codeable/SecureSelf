import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState} from "react";

export default function App() {
  const images = [
    "https://images5.alphacoders.com/135/thumb-1920-1355054.png",
    "https://images3.alphacoders.com/135/thumb-1920-1355056.png",
    "https://images5.alphacoders.com/135/thumb-1920-1355055.png",
    "https://images6.alphacoders.com/133/thumb-1920-1330040.jpeg"
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Breaches", "CheckEmail", "CheckDomain", "CheckPassword"];

  return (
    <ImagesSlider className="h-screen" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <nav className="hidden md:block px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          {menuItems.map((item, index) => (
            <Link 
              to={`/${item}`}  
              key={index}
              className="mx-2"
            >
              {item}
            </Link>
          ))}
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </nav>

        <div className="md:hidden flex justify-between items-center absolute flex gap-2 items-center justify-center rounded-lg top-1 text-gray-400 left-5 bg-emerald-300/10 border-t border-emerald-500/20">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white rounded-full px-4 py-2"
          >
            {isMenuOpen ? "x" : "Explore"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden flex flex-col items-center bg-emerald-300/10 border border-emerald-500/20 rounded-lg mt-2 absolute top-16 left-5">
            {menuItems.map((item, index) => (
              <Link 
                to={`/${item}`}  
                key={index}
                className="mx-2 my-2 text-white"
                onClick={() => setIsMenuOpen(false)} 
              >
                {item}
              </Link>
            ))}
          </div>
        )}
        <div className="absolute flex gap-2 px-4 py-2 text-bold items-center justify-center rounded-lg top-1 text-white right-5 bg-emerald-300/10 border-t border-emerald-500/20">
          SecureSelf
        </div>
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Secure your digital world <br /> right at your fingertips
        </motion.p>

        <footer className="absolute flex gap-2 px-4 py-1 items-center justify-center rounded-lg bottom-1 text-gray-400 md:left-5 bg-emerald-300/10 border-t border-emerald-500/20">
        <div className="p-0.5 rounded-full bg-white">
          <img 
          src="https://github.githubassets.com/favicon.ico"
          alt="github:"
          className="w-4 h-4 bg-white" 
          />
          </div>
          <a 
          href="https://github.com/lalith-codeable"  
          className="text-white hover:underline underline-offset-4"
          target="blank">
          @lalith-borana
          </a>
        </footer>
      </motion.div>
    </ImagesSlider>
  );
}
