import { vrouter } from "@ncpa0cpl/vrouter";
import { DetailsPage } from "./pages/details/details";
import { ErrorPage } from "./pages/error/error";
import { FeaturesPage } from "./pages/features/features";
import { Layout } from "./pages/layout";
import { SummaryPage } from "./pages/summary/summary";

declare const BASEPATH: string | undefined;

export const router = vrouter({
  basePath: BASEPATH,
  paramNames: ["eng"],
  title: "test262.fyi",
  component: (ctx) => <Layout ctx={ctx} />,
  subroutes: (define) => ({
    summaries: define({
      default: true,
      memo: true,
      paramNames: [],
      component: ctx => <SummaryPage ctx={ctx} />,
    }),
    details: define({
      paramNames: ["file"],
      component: (ctx) => <DetailsPage ctx={ctx} />,
    }),
    features: define({
      paramNames: [],
      component: ctx => <FeaturesPage />,
    }),
    error: define({
      paramNames: [],
      memo: true,
      component: () => <ErrorPage />,
    }),
  }),
});
