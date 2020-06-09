import React from "react";
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from "./BurgerBuilder";
import Controls from "../../components/Burger/Controls/Controls";

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder ingredientsInit={()=>{}}/>);
    })

    it('should render <Controls/> when receving ingredients', function () {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(Controls)).toHaveLength(1);
    });
});
