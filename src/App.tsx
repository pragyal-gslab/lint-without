import React, { lazy, Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import { CircularProgress } from "@material-ui/core";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="w-100 h-100">
      <Router history={history}>
        <Switch>
          <Route path="/" exact strict render={() => <Redirect to="/home" />} />
          <Route
            path="/home"
            strict
            render={() => {
              const MainLayout = lazy(() =>
                import("./modules/layout/MainLayout")
              );
              return (
                <Suspense
                  fallback={
                    <div className="h-100 w-100 d-flex flex-jc-center flex-ai-center">
                      <CircularProgress />
                    </div>
                  }
                >
                  <MainLayout />
                </Suspense>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
