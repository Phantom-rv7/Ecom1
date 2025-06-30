import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import {  Outlet, useNavigate } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";


interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?:boolean;
  admin?:boolean;
  redirect?:string;
}

const ProtectedRoute  = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",}
   : Props) => {
  //   if (!isAuthenticated) {
  //   return (
  //     <div style={{ padding: "2rem", textAlign: "center" }}>
  //       <h2>Access Denied</h2>
  //       <p>You must be logged in to view this page.</p>
  //       <a href={redirect} style={{ color: "#007bff", textDecoration: "underline" }}>
  //         Click here to log in
  //       </a>
  //     </div>
  //   );
  // }
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state?.showToast) {
//       toast.error("⚠️ Please log in first to buy a product");

//       // Clear toast state from history to avoid repeat on refresh
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state]);
//   useEffect(() => {
//   if (!isAuthenticated) {
//     navigate("/login", { replace: true, state: { showToast: true } });
//   }
//     (isAuthenticated) {
//     navigate("/");
// }, [isAuthenticated, navigate]);


// if (!isAuthenticated) {
//   return <Navigate to="/login" replace state={{ showToast: true, }} />;
// }

if (!isAuthenticated) {
  return <Navigate to="/login" replace state={{ from: location.pathname, showToast: true }} />;
}



    // if(!isAuthenticated) 
    //   // alert("Log in First")
    //   return <Navigate to = {redirect} />
//     if (!isAuthenticated) {
//   return <Navigate to="/login" state={{ showToast: true }} replace />;
// }


    if(adminOnly && !admin) return <Navigate to = {redirect} />;

  return children?children : <Outlet />;


}
// const ProtectedRoute = ({
//   isAuthenticated,
//   children,
//   adminOnly,
//   admin,
//   redirect = "/",
// }: Props) => {
//   useEffect(() => {
//     if (!isAuthenticated) {
//       toast.error("Please Login At First to Continue...");
//     } 
//   }, [isAuthenticated]);

//   if(!isAuthenticated) return <Navigate to = {redirect} />

//    if(adminOnly && !admin) return <Navigate to = {redirect} />;

//   return children ? children : <Outlet />;
// };

export default  ProtectedRoute;
