import React, { useEffect } from "react"
import CreateWill from '../../components/Common/CreateWill/CreateWill';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { blogAction } from "../../store/actions";
import styles from './styles.module.scss';
import { Spin } from "antd";
import Blogs from "../../components/Common/Blogs/Blogs";

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading, currentBlog } = useSelector((state) => state.Blog)
  
  useEffect(() => {
    dispatch(blogAction.getBlogById(id))
  }, [id, dispatch])

  return (
    <>
      <div className={styles.blog_detail}>
        <div className={styles.wrapper}>
          <div className={styles.blog_img}>
            <img src={currentBlog?.jetpack_featured_media_url} alt="blog-img" />
          </div>
          {loading && <Spin />}
          <p className={styles.title}>{currentBlog?.title?.rendered.replace("&#038;", "&").replace("&#8211;", "-").replace("&#8217;", "'")}</p>
        </div>
      </div>
      <div className={styles.blog_render}>
        <div dangerouslySetInnerHTML={{ __html: currentBlog?.content?.rendered }} />
      </div>

      <CreateWill />
      <Blogs />
    </>
  )
}

export default BlogDetail