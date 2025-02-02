"use client";

import React, { useState } from 'react';
import ExperienceCard from '../sub/ExperienceCard';
import ExperienceDetailsModal from '../sub/ExperienceDetailsModal';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/utils/motion';

interface Experience {
  company: string;
  role: string;
  shortDescription: string;
  description: string;
  date: string;
  location: string;
}

const experiences: Experience[] = [
  {
    company: 'Docula',
    role: 'Co-founder',
    shortDescription: 'Building an academic workspace with AI agents for course planning, exam generation, and concept podcasts.',
    description: `• Built an academic workspace using NextJS for the frontend (Vercel), and FastAPI for the backend (Render). Used Supabase with PGVector for embeddings, managed using Drizzle.

• Created 3 AI Agents for course planning, exam generation and concept podcast creation using Autogen and Pydantic, and deployed them on Modal for web inference.

• Served the interactions using OpenRouter and Langchain. Utilised Langfuse to monitor outputs and cost.`,
    date: 'October 2024 - Present',
    location: 'Vancouver, Canada'
  },
  {
    company: 'Galileo',
    role: 'Co-founder',
    shortDescription: 'Building an academic workspace with AI agents for course planning, exam generation, and concept podcasts.',
    description: `• Built an academic workspace using NextJS for the frontend (Vercel), and FastAPI for the backend (Render). Used Supabase with PGVector for embeddings, managed using Drizzle.

• Created 3 AI Agents for course planning, exam generation and concept podcast creation using Autogen and Pydantic, and deployed them on Modal for web inference.

• Served the interactions using OpenRouter and Langchain. Utilised Langfuse to monitor outputs and cost.`,
    date: 'October 2024 - Present',
    location: 'Vancouver, Canada'
  },
  {
    company: 'PayAmigo',
    role: 'Machine Learning Operations Intern',
    shortDescription: 'Implemented ETL pipelines and built high-performance dashboards for transaction data analysis.',
    description: `• Implemented ETL pipelines using AWS S3/Glue/Spark and integrated with Apache Airflow, refining terabytes of transaction data for machine learning.

• Deployed a custom Grafana plugin (React, Docker) enabling granular MySQL metrics filtering, accelerating dashboard query analysis by 2500% for 25 developers.

• Built high-performance dashboards with NextJS on AWS Amplify, streaming from AWS RDS to handle thousands of concurrent requests efficiently.`,
    date: 'July 2024 - December 2024',
    location: 'Florida, USA'
  },
  {
    company: 'Workday',
    role: 'Software Application Development Engineer Intern - Financial Assets',
    shortDescription: 'Developed Workday X2 extension and optimized high-usage business assets performance.',
    description: `• Developed a Workday X2 extension (React, TypeScript) with a proxy user switch, saving 7,500 hours ($500,000) annually.

• Linked OMS metadata and JIRA tickets in MySQL, and used LLaMa to identify duplicate JIRA tickets.

• Reduced page load times by 90% (5 min to 30s) for high-usage business assets by re-architecting with Xpresso and reorganizing key data views.`,
    date: 'May 2023 - December 2023',
    location: 'Vancouver, Canada'
  }
];

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
  }

  const handleCloseModal = () => {
    setSelectedExperience(null);
  }

  return (
    <div className='relative flex flex-col items-center justify-center py-32 md:py-40'>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#17151e]">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#C6FE0133_1px,transparent_1px),linear-gradient(to_bottom,#C6FE0133_1px,transparent_1px)]" style={{ backgroundSize: '24px 24px' }} />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF008015] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C6FE0110] to-transparent" />
      </div>
      
      {/* Header */}
      <div className='relative mb-10 md:mb-20 px-4 md:px-0'>
        <motion.div 
          variants={fadeInUp(0.3)}
          initial="hidden"
          animate="visible"
          className='flex items-center gap-2 md:gap-4'
        >
          <div className='w-10 md:w-20 h-1 bg-gradient-to-r from-[#FF0080] to-transparent' />
          <h1 className='text-[28px] md:text-[40px] font-bold text-[#FF0080] tracking-wider'>EXPERIENCE</h1>
          <div className='w-10 md:w-20 h-1 bg-gradient-to-l from-[#FF0080] to-transparent' />
        </motion.div>
        <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#00E6E6] to-transparent' />
      </div>

      {/* Experience cards */}
      <div className='w-full max-w-[1600px] mx-auto px-4 md:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={fadeIn((index + 2) * 0.1)}
              initial="hidden"
              animate="visible"
              className='flex justify-center'
            >
              <ExperienceCard
                company={experience.company}
                role={experience.role}
                shortDescription={experience.shortDescription}
                description={experience.description}
                date={experience.date}
                location={experience.location}
                onClick={() => handleExperienceClick(experience)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedExperience && (
        <ExperienceDetailsModal
          company={selectedExperience.company}
          role={selectedExperience.role}
          description={selectedExperience.description}
          date={selectedExperience.date}
          location={selectedExperience.location}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Experience;
