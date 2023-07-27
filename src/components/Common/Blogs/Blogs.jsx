import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import arrowIcon from '../../../assets/images/blogs/arrow.svg';
import { useSelector, useDispatch } from "react-redux";
import { blogAction } from "../../../store/actions"
import {changeDate, stripHtmlTags} from '../../../helper/function'
import { Spin } from "antd";


const Blogs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const { loading, recommendBlogs } = useSelector((state) => state.Blog)

  useEffect(() => {
    dispatch(blogAction.getRecommendBlogs())
  }, [dispatch])

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  const goDetail = (blogId) => {
    history.push(`/blogs/${blogId}`)
  }

  return (
    <section className={styles.blogs_section}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Learn</p>
          <div className={styles.heading}>
            <h1>Recommended For You</h1>
            <Link to={"/blogs"}>
              <button>
                View All Blogs &nbsp;
                <img src={arrowIcon} alt="Arrwo" />
              </button>
            </Link>
          </div>
        </div>
        {loading && <Spin />}
        <div
          className={styles.blogs}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {recommendBlogs.map((blog, index) => (
            <div className={styles.blog} key={index} onClick={() => goDetail(blog.id)}>
              <div className={styles.image_container}>
                <img src={blog?.jetpack_featured_media_url} alt="" draggable={false} />
                <h6 className={styles.date}>{changeDate(blog.modified)}</h6>
              </div>
              <h6>{ blog?.title?.rendered.replace("&#038;", "&").replace("&#8211;", "-").replace("&#8217;", "'")}</h6>
              <p>{stripHtmlTags(blog?.content?.rendered).substring(0, 150)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blogs