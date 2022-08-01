import { model } from "@formily/reactive";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TodoModel from "./todoModel";

const todoModel = model(new TodoModel("aa"));

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App model={todoModel} />
  </React.StrictMode>
);
