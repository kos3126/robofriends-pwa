import React from "react";
import { connect } from "react-redux";
import { setSearchField, setRequestRobots } from "../actions";

import MainPage from "../components/MainPage";

import "./App.css";

// state系のpropsをconnectでAppへ渡す
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

// method系のpropsをconnectでAppへ渡す
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(setRequestRobots()),
    // setRequestRobots()(dispatch)でも同じ動作をする
  };
};

class App extends React.Component {
  render() {
    return <MainPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
