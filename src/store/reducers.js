import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import EmailVerify from "./auth/emailVerify/reducer";
import Profile from "./auth/profile/reducer";
import Passdown from "./will/passdown/reducer";
import Info from "./will/info/reducer";
import Executor from "./will/executor/reducer";
import Digital from "./will/digital/reducer";
import Gifts from "./will/gifts/reducer";
import Children from "./will/children/reducer";
import Pets from "./will/pets/reducer";
import Provisions from "./will/provisions/reducer";
import Residuary from "./will/residuary/reducer";
import Assets from "./will/assets/reducer";
import Relations from "./will/relations/reducer";
import Review from "./will/review/reducer";
import Users from "./admin/users/reducer";
import Docs from "./admin/docs/reducer";
import currentStep from "./will/current-step/reducer";
import Blog from './blog/reducer';
import ChatGpt from './will/chat-gpt/reducer'

const rootReducer = combineReducers({
  Layout,
  Login,
  Account,
  EmailVerify,
  ForgetPassword,
  Profile,
  Executor,
  Passdown,
  Info,
  Digital,
  Gifts,
  Children,
  Pets,
  Provisions,
  Assets,
  Relations,
  Residuary,
  Review,
  Users,
  Docs,
  currentStep,
  Blog,
  ChatGpt
});

export default rootReducer;
