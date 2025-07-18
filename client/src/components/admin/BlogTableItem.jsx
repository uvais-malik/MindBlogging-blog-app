import React from 'react'
// Importing assets such as icons/images
import { assets } from '../../assets/assets';
// Importing custom app context hook to access shared state and axios
import { useAppContext } from '../../context/AppContext';
// Importing toast for showing success/error notifications
import toast from 'react-hot-toast';

// Functional component to display a single blog row in the table
const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  
  // Destructuring blog title and creation date
  const { title, createdAt } = blog;
  // Creating a date object for formatting display
  const BlogDate = new Date(createdAt);

  // Getting axios instance from app context
  const { axios } = useAppContext();

  // Function to handle blog deletion
  const deleteBlog = async () => {
    // Ask user for confirmation before deleting
    const confirm = window.confirm('Are you sure! Do you want to delete this blog?');
    if (!confirm) return;

    try {
      // Sending a POST request to delete the blog using its ID
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      if (data.success) {
        // Show success message and refresh blog list
        toast.success(data.message);
        await fetchBlogs();
      } else {
        // Show error message if deletion failed
        toast.error(data.message);
      }
    } catch (error) {
      // Show error toast if request fails
      toast.error(error.message);
    }
  };

  // Function to toggle blog's published/unpublished status
  const togglePublish = async () => {
    try {
      // Send POST request to toggle publish status
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        // Show success and refresh list
        toast.success(data.message);
        await fetchBlogs();
      } else {
        // Show error if failed
        toast.error(data.message);
      }
    } catch (error) {
      // Handle request error
      toast.error(error.message);
    }
  };

  // Returning JSX for a single blog row in a table
  return (
    <tr className='border-y border-gray-300'>
      {/* Display blog index */}
      <th className='px-2 py-4'>{index}</th>

      {/* Display blog title */}
      <td className='px-2 py-4'>{title}</td>

      {/* Display creation date (hidden on small screens) */}
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>

      {/* Display publish status (hidden on small screens) */}
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      {/* Action buttons: toggle publish and delete */}
      <td className='px-2 py-4 flex text-xs gap-3'>
        {/* Button to toggle publish/unpublish */}
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>

        {/* Image button to delete the blog */}
        <img 
          src={assets.cross_icon} 
          alt="" 
          onClick={deleteBlog} 
          className='w-8 hover:scale-110 transition-all cursor-pointer'
        />
      </td>
    </tr>
  );
};

export default BlogTableItem; // Export the component for use in other files

