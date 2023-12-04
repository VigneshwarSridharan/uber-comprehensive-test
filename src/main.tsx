import React from "react";
import FusionApp from "fusion-react";
import Router from "fusion-plugin-react-router";
import Styletron from "fusion-plugin-styletron-react";
import HelmetPlugin from "fusion-plugin-react-helmet-async";
import { initServer } from "../server";
import App from "./App";

import RPC, {
  RPCToken,
  RPCHandlersToken,
  ResponseError,
} from 'fusion-plugin-rpc';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import { FetchToken } from 'fusion-tokens';
import { createPlugin } from "fusion-core";


export const userPlugin = createPlugin({
  deps: { RPC: RPCToken },
  middleware: ({ RPC }) => async (ctx, next) => {
    RPC.from(ctx).request('getUser', 1).then(console.log);
    await next()
  }
})


// Define your rpc methods server side
const handlers = __NODE__ && {
  getUser: async (args, ctx) => {
    console.log('handlers')
    return { some: 'data' + args };
  },
  test: async (args, ctx) => {
    return { data: "Sample" }
  },
};


export default () => {
  const app = new FusionApp(<App />);

  app.register(RPCToken, RPC);
  app.register(UniversalEventsToken, UniversalEvents);
  __NODE__
    ? app.register(RPCHandlersToken, handlers)
    : app.register(FetchToken, window.fetch);

  if (__NODE__) {

    initServer(app);
  }

  app.register(HelmetPlugin);
  app.register(Styletron);
  app.register(Router);
  return app;
};
