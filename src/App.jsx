import { Route, Routes } from "react-router-dom";
import { accountRoute, adminRoute, publicRoute } from "./routers";
import { Fragment } from "react";
import ClientLayout from "./components/Layout/ClientLayout";
import UserLayout from "./components/Layout/UserLayout";
import Dashboard from "./components/Layout/Dashboard";



function App() {
  return (
    <div>
      
      <Routes>
        {publicRoute.map((route, index) => {
          const Layout = route.layout === null ? Fragment : ClientLayout;
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route?.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {accountRoute.map((route, index) => {
          const Layout = route.layout === null ? Fragment : UserLayout;
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route?.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {adminRoute.map((route, index) => {
          const Layout = route.layout === null ? Fragment : Dashboard;
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route?.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      
    </div>
  );
}

export default App;
