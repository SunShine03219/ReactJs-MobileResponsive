import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import arrowIcon from '../../../../assets/images/blogs/arrow.svg';
import searchIcon from '../../../../assets/images/blogs/Search.svg';
import axios from 'axios'
import { Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { blogAction } from "../../../../store/actions"
import { useHistory } from "react-router-dom";
import { changeDate, stripHtmlTags } from '../../../../helper/function'

const LatestBlogs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)

  const { blogs, latestBlogs, anotherBlogs } = useSelector((state) => state.Blog);

  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_BLOG_URL}/wp-json/wp/v2/posts?per_page=6&page=${currentPage}`)
      .then(response => {
        setLoading(false)
        const totalPagesCount = response.headers['x-wp-totalpages'];
        setTotalPages(totalPagesCount ? parseInt(totalPagesCount) : 1);
        dispatch(blogAction.setBlogs(response.data));
        if (currentPage === 1) {
          dispatch(blogAction.setLatestBlogs(response.data.slice(0, 4)));
          dispatch(blogAction.setAnotherBlogs(response.data.slice(0, 3)));
        }
      })
      .catch(error => console.error(error));
  }, [currentPage, dispatch])

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const renderPaganation = () => {
    const elements = [];
    for (let i = 1; i <= totalPages; i++) {
      elements.push(<button className={currentPage === i && styles.active} key={i}>{i}</button>);
    }
    return elements;
  }


  const gotoDetail = (blogId) => {
    history.push(`/blogs/${blogId}`)
  }

  return (
    <section className={styles.latest_blogs}>
      <div className={styles.wrapper}>
        <div className={styles.l_blogs}>
          <div className={styles.heading}>
            <h3>Latest Blogs</h3>
            <img src={searchIcon} alt="Search Icon" />
          </div>
          {loading && <Spin />}
          <div className={styles.blogs_container}>
            {blogs.map((blog, index) => (
              <div className={styles.blog} key={index} onClick={() => gotoDetail(blog.id)}>
                <div className={styles.image_container}>
                  <img src={blog?.jetpack_featured_media_url} alt="" draggable={false} />
                  <h6 className={styles.date}>{changeDate(blog.modified)}</h6>
                </div>
                <h6>{
                  blog?.title?.rendered.replace("&#038;", "&").replace("&#8211;", "-").replace("&#8217;", "'")
                }
                </h6>
                <p>{stripHtmlTags(blog?.content?.rendered).substring(0, 150)}</p>
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <div className={styles.pagination}>
              {renderPaganation()}
            </div>
            <div className={styles.arrows}>
              <img src={arrowIcon} className={styles.arrow_one} alt="Arrow One" onClick={goToPrevPage} />
              <img src={arrowIcon} className={styles.arrow_two} alt="Arrow Two" onClick={goToNextPage} />
            </div>
          </div>
        </div>

        <aside>

          <div className={styles.heading}>
            <h3>Latest Blogs</h3>
          </div>

          <div className={styles.blogs_container}>
            {latestBlogs.map((blog, index) => (
              <div className={styles.blog} key={index} onClick={() => gotoDetail(blog.id)}>
                <img src={blog?.jetpack_featured_media_url} alt="Blog Img" draggable={false} />
                <div className={styles.content}>
                  <h6>{blog?.title?.rendered.replace("&#038;", "&").replace("&#8211;", "-").replace("&#8217;", "'")}</h6>
                  <p>{stripHtmlTags(blog?.content?.rendered).substring(0, 100)}</p>
                  <p className={styles.date}>{changeDate(blog.modified)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.heading_second}>
            <h3>Another Blogs</h3>
          </div>

          <div className={styles.blogs_container}>
            {anotherBlogs.map((blog, index) => (
              <div className={styles.blog} key={index} onClick={() => gotoDetail(blog.id)}>
                <img src={blog?.jetpack_featured_media_url} alt="Blog Img" draggable={false} />
                <div className={styles.content}>
                  <h6>{blog?.title?.rendered.replace("&#038;", "&").replace("&#8211;", "-").replace("&#8217;", "'")}</h6>
                  <p>{stripHtmlTags(blog?.content?.rendered).substring(0, 100)}</p>
                  <p className={styles.date}>{changeDate(blog.modified)}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default LatestBlogs