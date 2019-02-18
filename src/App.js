import React, { Component } from 'react';
import history from './history'
import { Router , Route, Switch } from "react-router";

import Step1Page from "./container/step-1-container/FlightIdContainer";
import Step2Page from "./container/step-2-container/BarcodeScanContainer";
import WaybillCheckingPage from "./container/waybill-check-container/WaybillCheckingContainer";
import EmsTracking from "./container/ems-container/EmsContainer";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/create-flight-id' component={Step1Page}/>
          <Route exact path='/barcode-scan' component={Step2Page}/>
          <Route exact path='/waybill-check' component={WaybillCheckingPage}/>
          <Route exact path='/' component={EmsTracking}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
