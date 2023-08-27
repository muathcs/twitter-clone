import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./component/HomePage";
import Resgister from "./component/Register";
import { Route, Routes } from "react-router-dom";
import Auth from "./component/Auth";
import PostsSections from "./component/PostsSections";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import Settings from "./component/Settings";

function App() {
  const postsRedux = useSelector((state: RootState) => state.postsRedux);
  const { darkMode } = useSelector((state: RootState) => state.displayRedux);

  const user = useSelector((state: RootState) => state.setSigned);

  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <div className={`h-full ${darkMode && "dark"} `}>
      {/* <button
        className={`bg-red-400 py-2 px-5 rounded-lg`}
        onClick={(e) => setDarkToggle(!darkToggle)}
      >
        Dark-light
      </button> */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              middleComponent={
                <PostsSections user={user} postsRedux={postsRedux} />
              }
            />
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Resgister />} />
        <Route
          path="/settings"
          element={<HomePage middleComponent={<Settings />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
