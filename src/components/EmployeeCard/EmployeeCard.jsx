import React from 'react'
import { motion } from "framer-motion"

const EmployeeCard = ({employee}) => {
  return (
    <motion.div initial={
    
        
           { opacity: 0, scale: 0.5 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0, 0.41, 0.1, 1.01],
      }} class="flex flex-col items-center p-2">
        <img class="w-12 h-12 mb-2 rounded-full shadow-lg" src="/images/user.jpg" alt="Bonnie image"/>
        <h5 class="mb-1 text-sm font-medium text-gray-900 dark:text-white">{employee.first_name}{" "}{employee.last_name}</h5>
        <span class="text-xs text-gray-500 dark:text-gray-400">Visual Designer</span>
        
    </motion.div>
  )
}

export default EmployeeCard
