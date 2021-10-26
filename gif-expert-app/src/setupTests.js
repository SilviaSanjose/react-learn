// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

//Enzyme
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//Enzyme to Json
import { createSerializer } from "enzyme-to-json";

//Enzyme
Enzyme.configure({ adapter: new Adapter() });

//Enzyme to Json
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));