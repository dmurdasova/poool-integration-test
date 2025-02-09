import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccessContext } from "@poool/react-access";

import { defaultHistory } from "../utils";
import Home from "./Home";
import Premium from "./Premium";
import Auth from "./Auth";
import Ads from "./Ads";

export default () => {
  useEffect(() => {
    return defaultHistory.listen(() => window.scrollTo(0, 0));
  }, []);

  return (
    <BrowserRouter history={defaultHistory}>
      <Auth>
        <AccessContext
          appId="155PF-L7Q6Q-EB2GG-04TF8"
          config={{
            // debug: true,
            cookies_enabled: true,
            custom_segment: "react",
            mode: "excerpt",
            percent: 90,
          }}
          withAudit={true}
        >
          <Routes>
            <Route
              path="/premium"
              element={
                <Premium>
                  <Ads id={1} />
                  <Ads id={2} />
                  <Ads id={3} />
                  <Ads id={4} />
                  <Ads id={5} />
                  <Ads id={6} />
                </Premium>
              }
            />
            <Route index element={<Home />} />
          </Routes>
        </AccessContext>
      </Auth>
    </BrowserRouter>
  );
};
