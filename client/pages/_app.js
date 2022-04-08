import "../styles/globals.css";

import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import CssBaseline from "@mui/material/CssBaseline";

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CssBaseline />
        <Component {...pageProps} />
        <div>dadada</div>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
