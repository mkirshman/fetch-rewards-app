import React from "react";
import { shallow } from "enzyme";
import FetchRewards from "./FetchRewards";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("FetchRewards", () => {
  it("renders the title of the idea in <h3> tags", () => {
    const wrapper = shallow(<FetchRewards />);

    expect(wrapper).toMatchSnapshot();
  });
});
