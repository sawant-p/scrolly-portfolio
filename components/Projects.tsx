"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Nexora - AI Chat App",
    role: "LangChain, Ollama, Streamlit",
    desc: "Built a GenAI chatbot with real-time streaming responses using local LLMs like Mistral, Gemma & Phi-3.",
    link: "https://github.com/sawant-p",
    image: "/nexora.png"
  },
  {
    id: 2,
    title: "Diabetes Prediction Model",
    role: "Python, Scikit-learn",
    desc: "Built a Linear SVM classifier for diabetes prediction including full EDA, preprocessing, and feature scaling.",
    link: "https://github.com/sawant-p",
    image: "/diabetes.png"
  },
  {
    id: 3,
    title: "Salary Management System",
    role: "SQL, PL/SQL",
    desc: "Designed automated salary processing pipelines with advanced PL/SQL procedures, triggers, and robust exception handling.",
    link: "https://github.com/sawant-p",
    image: "/salary.png"
  },
  {
    id: 4,
    title: "Namma Yatri Data Insight",
    role: "SQL, Power BI",
    desc: "Converted raw data into a normalized SQL database and built dynamic Power BI dashboards with meaningful KPI visualizations.",
    link: "https://github.com/sawant-p",
    image: "/namma.png"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { stiffness: 80, damping: 20 } 
  },
};

export default function Projects() {
  return (
    <section className="relative z-10 bg-background transition-colors duration-300 py-32 px-6 md:px-24 min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto w-full"
      >
        <motion.h3 variants={cardVariants} className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-foreground border-b border-black/10 dark:border-white/10 pb-8 uppercase text-zinc-900 dark:text-zinc-100">
          Selected Work
        </motion.h3>
        
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <motion.a 
              variants={cardVariants}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              key={proj.id} 
              className="group relative flex flex-col justify-between p-10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md overflow-hidden hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-500 min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
              
              <img src={proj.image} alt={proj.title} className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500 z-0 mix-blend-overlay" />

              <div className="relative z-10">
                <p className="text-zinc-500 text-sm font-semibold tracking-widest uppercase mb-6 drop-shadow-sm dark:drop-shadow-md">
                  {proj.role}
                </p>
                <h4 className="text-3xl font-bold text-foreground mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-800 group-hover:to-zinc-500 dark:group-hover:from-zinc-100 dark:group-hover:to-zinc-600 transition-all duration-300 drop-shadow-sm dark:drop-shadow-md">
                  {proj.title}
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-lg drop-shadow-sm dark:drop-shadow-md">
                  {proj.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between w-full mt-10 pt-6 border-t border-black/5 dark:border-white/5">
                <span className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 cursor-pointer">
                  View on GitHub
                </span>
                <ExternalLink className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
