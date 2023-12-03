import React from "react";
import FusionApp from "fusion-react";
import Router from "fusion-plugin-react-router";
import Styletron from "fusion-plugin-styletron-react";
import HelmetPlugin from "fusion-plugin-react-helmet-async";
import { initServer } from "../server";

import App from "./App";

export default () => {
  const app = new FusionApp(<App />);

  initServer(app);
  app.register(HelmetPlugin);
  app.register(Styletron);
  app.register(Router);
  return app;
};
