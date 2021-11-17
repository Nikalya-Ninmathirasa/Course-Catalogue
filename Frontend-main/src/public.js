// core components/views for Admin layout
import Login from './views/Minimal/Login/Login'
import ForgotPassword from './views/Minimal/ForgotPassword/ForgotPassword'
import Signup from './views/Minimal/Signup/Signup'

import login from './assets/img/Signin.png'
import confirm from './assets/img/Confirm.png'



const publicRoutes = [
  {
    path: "/login",
    image: login,
    title: "Standard Catalogued Data",
    text: "Large volumes data categorized based on distinct criteria for easy and effective filtering of the necessary information.",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgot",
    image: confirm,
    title: "Instant Information at your fingertips",
    text: "Browse in variety of educational opportuniities from institutes all over the island",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/signup",
    image: confirm,
    title: "Instant Information at your fingertips",
    text: "Browse in variety of educational opportuniities from institutes all over the island",
    component: Signup,
    layout: "/auth"
  },
  
];

export default publicRoutes;
