import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";
const CoursesList = lazy(() => import("./features/courses/ui/cousesList"));
const RegistreeList = lazy(() =>
  import("./features/registree/ui/registreeList")
);
const UserList = lazy(() => import("./features/user/ui/userList"));
const AddEditCourse = lazy(() => import("./features/courses/ui/addEditCourse"));
const AddEditUser = lazy(() => import("./features/user/ui/addEditUser"));
const RegistreeviewPage = lazy(() =>
  import("./features/registree/ui/registreeViewPage")
);
const FilteredRegistreeList = lazy(() =>
  import("./features/registree/ui/filteredRegistreeList")
);
const CatagoryList = lazy(() => import("./features/catagory/ui/catagoryList"));
const NewsList = lazy(() => import("./features/news/ui/newsList"));
const AddEditNews = lazy(() => import("./features/news/ui/addEditNews"));

import { ROLES } from "./utils/utils";
import Layout from "./features/layout/ui/layout";
import DashBoardlayout from "./components/dashBoardlayout";
import Public from "./pages/public";
import PublicLayout from "./components/publicLayout";
import About from "./pages/about";
import NewsDetail from "./features/news/ui/newsDetail";
import NewsSection from "./features/news/ui/newsSection";
import CoursePublicListPage from "./features/courses/ui/coursePublicListPage";
import PotectedRoute from "./utils/protectedRoute";
import Login from "./features/auth/ui/loginPage";
import RegistrationPage from "./features/registree/ui/registrationPage";
import SuccessFullPage from "./pages/successFullPage";
import CourseDetailPage from "./features/courses/ui/courseDetailPage";
import { useSelector } from "react-redux";
import { selectFirstTimeLogin, selectRole } from "./features/auth/authSlice";
import ResetPasswordForm from "./pages/changePassword";

function App() {
  const role = useSelector(selectRole);
  const firstTimeLogin = useSelector(selectFirstTimeLogin);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<PublicLayout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
            <Route path="course" element={<CoursePublicListPage />} />
            <Route path="news" element={<NewsSection />} />
            <Route path="about" element={<About />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="course/:id" element={<CourseDetailPage />} />
            <Route path="auth/changePassword" element={<ResetPasswordForm />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path=":id/register" element={<RegistrationPage />} />
            <Route path=":id/sucessfull" element={<SuccessFullPage />} />
          </Route>

          <Route
            element={
              <PotectedRoute allowedRoles={[ROLES.admin, ROLES.lecture]} />
            }
          >
            <Route path="dash" element={<DashBoardlayout />}>
              <Route
                index
                element={
                  firstTimeLogin ? (
                    <Navigate to="/auth/changePassword" />
                  ) : role === "Admin" ? (
                    <Navigate to="registrees" />
                  ) : (
                    <Navigate to="courses" />
                  )
                }
              />
              <Route path="courses">
                <Route index element={<CoursesList />} />
                <Route path=":id" element={<AddEditCourse />} />
                <Route path="create" element={<AddEditCourse />} />
              </Route>
              <Route element={<PotectedRoute allowedRoles={[ROLES.admin]} />}>
                <Route path="registrees">
                  <Route index element={<RegistreeList />} />
                  <Route
                    path="catagory/:courseId"
                    element={<FilteredRegistreeList />}
                  />
                  <Route path=":id" element={<RegistreeviewPage />} />
                </Route>
                <Route path="news">
                  <Route index element={<NewsList />} />
                  <Route path=":id" element={<AddEditNews />} />
                  <Route path="create" element={<AddEditNews />} />
                </Route>
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path=":id" element={<AddEditUser />} />
                  <Route path="create" element={<AddEditUser />} />
                </Route>
                <Route path="catagory">
                  <Route index element={<CatagoryList />} />
                </Route>
                <Route path="layout">
                  <Route index element={<Layout />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
