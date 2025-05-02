import { router as vrouter } from "@ncpa0cpl/vrouter";
import { DetailsPage } from "./pages/details/details";
import { ErrorPage } from "./pages/error/error";
import { Layout } from "./pages/layout";
import { Summary } from "./pages/summary/summary";

export const router = vrouter({
  paramNames: ["eng"],
  title: "test262.fyi",
  component: (ctx) => <Layout ctx={ctx} />,
  subroutes: (define) => ({
    summaries: define({
      default: true,
      memo: true,
      paramNames: [],
      component: ctx => <Summary ctx={ctx} />,
    }),
    details: define({
      paramNames: ["file"],
      component: (ctx) => <DetailsPage ctx={ctx} />,
    }),
    features: define({
      paramNames: [],
    }),
    error: define({
      paramNames: [],
      memo: true,
      component: () => <ErrorPage />,
    }),
  }),
});
