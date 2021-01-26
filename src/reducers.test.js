import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants.js";

import * as reducers from "./reducers";

describe("searchRobots", () => {
  const initialStateSearch = {
    searchField: "",
  };

  it("should return the initial state", () => {
    expect(reducers.searchRobots(initialStateSearch, {})).toEqual({
      searchField: "",
    });
  });

  it("should handle CHANGE_SEARCH_FIELD", () => {
    const action = { type: CHANGE_SEARCH_FIELD, payload: "John" };
    expect(reducers.searchRobots(initialStateSearch, action)).toEqual({
      searchField: "John",
    });
  });
});

describe("requestRobots", () => {
  const initialStateRobots = {
    isPending: false,
    robots: [],
  };

  it("should return the initial state", () => {
    expect(reducers.requestRobots(initialStateRobots, {})).toEqual({
      isPending: false,
      robots: [],
    });
  });

  it("should handle REQUEST_ROBOTS_PENDING action", () => {
    expect(
      reducers.requestRobots(initialStateRobots, {
        type: REQUEST_ROBOTS_PENDING,
      }).isPending
    ).toBe(true);
  });

  it("should handle REQUEST_ROBOTS_SUCCESS action", () => {
    expect(
      reducers.requestRobots(initialStateRobots, {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: [{ id: 123, name: "test", email: "test@example.com" }],
      })
    ).toEqual({
      isPending: false,
      robots: [{ id: 123, name: "test", email: "test@example.com" }],
    });
  });

  it("should handle REQUEST_ROBOTS_FAILED action", () => {
    expect(
      reducers.requestRobots(initialStateRobots, {
        type: REQUEST_ROBOTS_FAILED,
        payload: "NOOOOOO!!!!",
      })
    ).toEqual({
      isPending: false,
      robots: [],
      error: "NOOOOOO!!!!",
    });
  });
});
