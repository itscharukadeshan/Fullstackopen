/** @format */

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import reducer from "./reducer";

import "./index.css";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const resetStats = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div className='flex flex-col gap-4 items-center p-8'>
      <div className='flex flex-row gap-2 mt-4'>
        <button className='btn btn-sm btn-outline' onClick={good}>
          good
        </button>
        <button className='btn btn-sm btn-outline' onClick={ok}>
          ok
        </button>
        <button className='btn btn-sm btn-outline' onClick={bad}>
          bad
        </button>
        <button className='btn btn-sm btn-outline' onClick={resetStats}>
          reset stats
        </button>
      </div>

      <div>
        <div className='stats stats-vertical lg:stats-horizontal shadow'>
          <div className='stat'>
            <div className='stat-title'>Good</div>
            <div className='stat-value text-green-600'>
              {store.getState().good}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Ok</div>
            <div className='stat-value text-warning'>{store.getState().ok}</div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Bad</div>
            <div className='stat-value text-red-600'>
              {store.getState().bad}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById("root");

const renderApp = () => {
  ReactDOM.render(<App />, root);
};

renderApp();
store.subscribe(renderApp);
