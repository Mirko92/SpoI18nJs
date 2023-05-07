import { WebPartContext } from "@microsoft/sp-webpart-base";

import { spfi, SPFI, SPFx } from "@pnp/sp";
import { GraphFI, graphfi, SPFx as graphSPFx} from "@pnp/graph";
// import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

// eslint-disable-next-line no-var
var _sp: SPFI = null;
var _graph: GraphFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (!!context) {
    _sp = spfi().using(SPFx(context));
  }
  return _sp;
};

export const getGraph = (context?: WebPartContext): GraphFI => {
  if (!!context) {
    _graph = graphfi().using(graphSPFx(context));
  }
  return _graph;
};