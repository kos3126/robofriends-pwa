import { shallow } from "enzyme";
// import { create } from "react-test-renderer";
import Card from "./Card";

it("expect to render Card component", () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});

/*
const card = create(<Card />);

it("expect to render Card component", () => {
  expect(card.toJSON()).toMatchSnapshot();
});
*/
