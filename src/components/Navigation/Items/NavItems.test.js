import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from "./NavItems";
import NavItem from "./Item/NavItem";

configure({
    adapter: new Adapter()
});

describe(
    '<NavItems/>',
    () => {
        let wrapper;
        beforeEach(
            () => {
                wrapper = shallow(<NavItems />);
            }
        );
        it('should render 2 NavItems', () => {
            expect(wrapper.find(NavItem)).toHaveLength(2);
        });
        it('should render 3 NavItems when authenticated', () => {
            wrapper.setProps({isAuth: true});
            expect(wrapper.find(NavItem)).toHaveLength(3);
        });
        it('should check for Logout existence', () => {
            wrapper.setProps({isAuth: true});
            expect(wrapper.contains(<NavItem link="/logout">Log Out</NavItem>)).toEqual(true);
        });
    }
);
