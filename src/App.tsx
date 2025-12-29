import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { routes, type RouteConfig } from "./Routes/routes";
import { Footer } from "./Components/Footer/Footer";
import { CookieConsent } from "./Components/CookieConsent/CookieConsent";

function App() {
  return (
    <div className={style.layout}>
      <Header />
      <main>
        <Routes>
          {routes.map(({ path, component: Component }: RouteConfig) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;
