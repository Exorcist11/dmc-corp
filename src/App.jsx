import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routers";
import { Fragment } from "react";
import clientLayout from "./components/Layout/clientLayout";

function App() {
  return (
    <div>
      <Routes>
        {publicRoute.map((route, index) => {
          const Layout = route.layout === null ? Fragment : clientLayout;
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
