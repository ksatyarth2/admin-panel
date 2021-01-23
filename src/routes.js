// import Dashboard from "views/Dashboard.js";
import Blog from "views/Blog.js";
import BlogDetail from "views/BlogDetail.js";
import AddBlog from "views/AddBlog.js";
import Login from "views/Login.js";
import AddAdmin from "views/AddAdmin.js";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  
  {
    path: "/blogs",
    name: "Blog List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-watch-time",
    component: Blog,
    layout: "/admin"
  },
  {
    path: "/add-admin",
    name: "Add Admin",
    icon: "tim-icons icon-simple-add",
    component: AddAdmin,
    layout: "/admin"
  }, 
  
  {
    path: "/blog-detail",
    name: "Blog Detail",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-watch-time",
    component: BlogDetail,
    layout: "/admin"
  },
  {
    path: "/add-blog",
    name: "New Blog",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-watch-time",
    component: AddBlog,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-bulb-63",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
