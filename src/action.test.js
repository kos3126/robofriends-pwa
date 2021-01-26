import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants.js";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import * as actions from "./actions";
import fetchMock from "fetch-mock";

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

const baseUrl = "https://jsonplaceholder.typicode.com";

describe("actions", () => {
  it("should create an action to search robots", () => {
    const text = "wooo";
    const expectedAction = {
      type: CHANGE_SEARCH_FIELD,
      payload: text,
    };
    expect(actions.setSearchField(text)).toEqual(expectedAction);
  });
});

describe("async actions test with fetchMock", () => {
  afterEach(() => {
    fetchMock.restore(); // fetchMockのリセット
  });

  it("should handle requesting robots API", () => {
    // fetchを一度だけmock化
    fetchMock.getOnce(`${baseUrl}/users`, {
      headers: { "Content-Type": "application/json" },
      status: 200,
      body: [{ id: 1, name: "John", email: "test@gmail.com" }],
    });
    // when handling errors
    // fetchMock.get(/some\/url/, {throws: yourError})
    /*
      fetchMock.mock(URL, () => {
p        throw new Error(ERROR_MESSAGE)
      })
    */

    // Expected result
    const expectedActions = [
      {
        type: REQUEST_ROBOTS_PENDING,
      },
      {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: [{ id: 1, name: "John", email: "test@gmail.com" }],
      },
    ];

    const store = mockStore();

    expect.assertions(1);
    // Promiseを返す
    return store.dispatch(actions.setRequestRobots()).then(() => {
      // console.log(JSON.stringify(store.getActions())); // output results
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should handle errors", () => {
    // fetchを一度だけmock化
    fetchMock.getOnce(`${baseUrl}/users`, () => {
      throw new Error("Caught an error");
    });

    // Expected result
    const expectedActions = [
      {
        type: REQUEST_ROBOTS_PENDING,
      },
      {
        type: REQUEST_ROBOTS_FAILED,
        payload: new Error("Caught an error"),
      },
    ];

    const store = mockStore();

    expect.assertions(1);
    // Promiseを返す
    return store.dispatch(actions.setRequestRobots()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
