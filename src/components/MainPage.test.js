import { shallow } from "enzyme";
import MainPage from "../components/MainPage";

describe("<MainPage />", () => {
  let wrapper,
    mockProps = {};

  beforeEach(() => {
    // it()やtest()毎に下記の状態に初期化される
    mockProps = {
      onRequestRobots: jest.fn(),
      robots: [],
      searchField: "",
      isPending: false,
    };
    wrapper = shallow(<MainPage {...mockProps} />);
  });

  it("renders MainPage without crashing", () => {
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loading text while pending", () => {
    Object.assign(mockProps, { isPending: true });
    wrapper = shallow(<MainPage {...mockProps} />);

    expect(wrapper.contains(<h1>Loading...</h1>)).toEqual(true);
  });

  it("filters robots correctly", () => {
    Object.assign(mockProps, {
      robots: [
        {
          id: 3,
          name: "John",
          email: "john@email.com",
        },
      ],
      searchField: "John",
    });
    wrapper = shallow(<MainPage {...mockProps} />);

    expect(wrapper.instance().filteredRobots()[0].name).toEqual("John");
    expect(wrapper.instance().filteredRobots()[0].id).toEqual(3);
    expect(wrapper.instance().filteredRobots()).toEqual([
      {
        id: 3,
        name: "John",
        email: "john@email.com",
      },
    ]);

    Object.assign(mockProps, {
      searchField: "a",
    });
    const filteredRobots = [];
    wrapper = shallow(<MainPage {...mockProps} />);

    expect(wrapper.instance().filteredRobots()).toEqual(filteredRobots);
  });
});
