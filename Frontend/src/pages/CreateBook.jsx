import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { HOST } from '../utils/api';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.post(`${HOST}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened , please retry after some time.")
        enqueueSnackbar('Error', { variant: 'error' });
        console.log("book create", error);
      });
  }
  return (
    <>
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Create Book</h1>
        {loading ? <Spinner /> : " "}
        <div className="flex flex-col border border-sky-400 roundex-xl w-[600px] p-4 mx-auto">
          {/* title */}
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-3 w-full'
            />
          </div>
          {/* author */}
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-3 w-full'
            />
          </div>
          {/* publish year */}
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-3 w-full'
            />
          </div>
          <button className="p-2 bg-sky-300 m-8 " onClick={handleSaveBook} >Crete Book</button>
        </div>
      </div>
    </>
  )
}

export default CreateBook