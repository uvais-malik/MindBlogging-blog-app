import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
          
           <div>
              <img src={assets.logo} alt="logo" className='w-32 sm:w-66' />
              <p className='max-w-[410px] mt-6'>Mind Blogging is your go-to destination for weird science, wild tech, and wonderfully unexpected ideas. From space tacos to AI with trust issues, we cover it all—ridiculous, insightful, and 100% binge-worthy. Join our nerdy little corner of the internet and feed your curiosity one absurdly awesome post at a time.</p>
           </div>

           <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
              {footer_data.map((section, index)=> (
                  <div key={index}>
                     <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                     <ul className='text-sm space-y-1'>
                        {section.links.map((link, i)=>(
                            <li key={i}>
                                <a href="#" className='hover:underline transition'>{link}</a>
                            </li>
                        ))}
                     </ul>
                  </div>
              ))}
              
           </div>

        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
            Copyright 2025 MindBlogging  All Rights Reserved.
        </p>
      
    </div>
  )
}

export default Footer
