import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

  const {title, description, category, image, _id} = blog;  
  const navigate = useNavigate()

  return (
    // <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
    //   <img src={image} alt="" className='aspect-video ' />


        <div
          onClick={() => navigate(`/blog/${_id}`)}
          className="relative w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
        >
          {/* ✅ Blurred background image */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 z-0"
            style={{ filter: 'blur(20px)' }} // ✅ proper style usage
          />

          {/* ✅ Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Foreground content */}
          <div className="relative z-10">
            {/* Main (sharp) image in center */}
            <div className="flex justify-center items-center aspect-video bg-transparent">
              <img
                src={image}
                alt={title}
                className=" w-70 h-60 object-cover"
              />
            </div>

            {/* Category */}
            <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
              {category}
            </span>

            {/* Text content */}
<div className="p-5">
  <h5 className="mb-2 font-medium text-gray-100">{title}</h5> {/* was gray-900 */}
  <p
    className="mb-3 text-xs text-gray-300" // was gray-600
    dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
  />
</div>
          </div>
        </div>
);
};


export default BlogCard
