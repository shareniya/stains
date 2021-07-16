import React from "react";
import ReactDOM from "react-dom";
import RegistForm from "../components/SignUp";

test("renders the correct content", () => {
  // render a React component to the DOM
  const div = document.createElement("div");
  ReactDOM.render(<RegistForm />, div);

  expect(div.querySelector("h1").textContent).toBe("Sign Up");
  expect(div.querySelector("label").htmlFor).toBe("email");
  expect(div.querySelector("button").textContent).toBe("Submit");
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RegistForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
