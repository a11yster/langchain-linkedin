import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
// import Navbar from './components/Navbar/index.tsx';

// const router = createBrowserRouter([
// 	{
// 	  path: "/",
// 	  element: <App />,
// 	//   loader: rootLoader,
// 	//   children: [
// 	// 	{
// 	// 	  path: "/",
// 	// 	  element: <Navbar />,
// 	// 	  loader: teamLoader,
// 	// 	},
// 	//   ],
// 	},
//   ]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
