import React from "react";
import { Redirect } from "react-router-dom";
import AdminLogin from "../pages/Authentication/AdminLogin";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ChangePwd from "../pages/Authentication/ChangePassword";
import EmailVerified from "../pages/Authentication/EmailVerified";
import Home from "../pages/Home";
import Will from "../pages/will";
import AboutUs from '../pages/AboutUs';
import Blogs from '../pages/Blogs';
import Terms from '../pages/Terms';
import Policy from '../pages/Policy';
import BlogDetail from '../pages/BlogDetail';
import ContactUs from '../pages/ContactUs';
import GetStart from '../pages/GetStart';
import Profile from '../pages/Profile';
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Documents from "../pages/Admin/Documents";


const authRoutes = [
  {
    path: "/admin",
    exact: true,
    component: () => <Redirect to="/admin/login" />,
  },
  { path: "/admin/login", component: AdminLogin },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/change-pass/:token", component: ChangePwd },
  { path: "/verify-email/:token", component: EmailVerified },
];

const mainRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
  { path: "/home", component: Home },
  { path: "/will", component: Will },
  { path: '/about-us', component: AboutUs},
  { path: '/blogs', component: Blogs},
  { path: '/terms', component: Terms},
  { path: '/policy', component: Policy},
  { path: '/blogs/:id', component: BlogDetail},
  { path: '/contact-us', component: ContactUs},
  { path: '/get-start', component: GetStart},
  { path: '/profile', component: Profile}
];

const adminRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: Users },
  { path: "/docs", component: Documents },
];

export { authRoutes, mainRoutes, adminRoutes };
