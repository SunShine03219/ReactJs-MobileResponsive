import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  changelayoutMode,
  changeLayoutPosition,
} from "../../store/actions";

const Layout = (props) => {
  const dispatch = useDispatch();

  const { topbarTheme, layoutWidth, layoutPosition, layoutMode } = useSelector(
    (state) => ({
      topbarTheme: state.Layout.topbarTheme,
      layoutWidth: state.Layout.layoutWidth,
      layoutPosition: state.Layout.layoutPosition,
      layoutMode: state.Layout.layoutMode,
    })
  );

  useEffect(() => {
    const title = props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);
    document.title = currentage;
  }, [props.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutPosition) {
      dispatch(changeLayoutPosition(layoutPosition));
    }
  }, [dispatch, layoutPosition]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  const { changelayoutMode, layoutType } = props;

  useEffect(() => {
    if (layoutMode) {
      dispatch(changelayoutMode(layoutMode, layoutType));
    }
  }, [layoutMode, changelayoutMode, layoutType, dispatch]);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header />
        <div className="main-content" style={{minHeight: "calc(100vh - 68.6px - 37px)"}}>{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changelayoutMode,
})(withRouter(Layout));
