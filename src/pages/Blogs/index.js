import React from 'react'

import Hero from './components/Hero/Hero';
import LatestBlogs from './components/LatestBlogs/LatestBlogs';
import CreateWill from '../../components/Common/CreateWill/CreateWill';
import Subscribe from './components/Subscribe/Subscribe';

const Blogs = () => {
  return (
    <>
      <Hero />
      <LatestBlogs />
      <CreateWill />
      <Subscribe />
    </>
  )
}

export default Blogs;
