"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { stiffness: 100, damping: 20 } 
  },
};

export default function Experience() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative z-10 bg-background text-foreground py-32 px-6 md:px-24 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Experience Column */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 border-b border-black/10 dark:border-white/10 pb-6 uppercase text-zinc-900 dark:text-zinc-100">
            Experience
          </h3>
          
          <div className="flex flex-col gap-12">
            <motion.div variants={itemVariants} className="group relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h4 className="text-3xl font-bold">AI & DS Intern</h4>
                <p className="text-zinc-500 font-medium whitespace-nowrap pt-2 md:pt-0">Jan 2026 - Present</p>
              </div>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                LeanQubit, Mumbai
              </p>
              <ul className="list-disc list-outside ml-6 space-y-4 text-zinc-700 dark:text-zinc-300 font-light leading-relaxed text-lg">
                <li>Developed and monitored SPC (Statistical Process Control) indicators to track manufacturing metrics.</li>
                <li>Designed and managed KPI dashboards and database pipelines to support decision-making.</li>
                <li>Built and deployed REST APIs using FastAPI for seamless data exchange.</li>
                <li>Integrated LangChain and LLM workflows to automate intelligent reporting tasks.</li>
                <li>Contributed to simulation projects modeling real-world processes to optimize performance.</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Education & Skills Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-20">
          <motion.div variants={containerVariants}>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 border-b border-black/10 dark:border-white/10 pb-6 uppercase text-zinc-900 dark:text-zinc-100">
              Education
            </h3>
            <div className="flex flex-col gap-8">
              <motion.div variants={itemVariants}>
                <h4 className="text-2xl font-bold mb-3 leading-tight">B.E. in Computer Science & Engineering <br/><span className="text-zinc-500">(Data Science)</span></h4>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">University of Mumbai</p>
                <div className="flex items-center justify-between text-zinc-500 text-base font-medium border-t border-black/5 dark:border-white/5 pt-4 mt-2">
                  <span>Aug 2022 - Apr 2026</span>
                  <span className="bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md">CGPA: 8.71</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants}>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 border-b border-black/10 dark:border-white/10 pb-6 uppercase text-zinc-900 dark:text-zinc-100">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'FastAPI', 'Machine Learning', 'LangChain', 'Ollama', 'Power BI', 'AWS', 'TensorFlow', 'LLMs'].map((skill) => (
                <motion.span 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  key={skill} 
                  className="px-5 py-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-semibold cursor-default transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
