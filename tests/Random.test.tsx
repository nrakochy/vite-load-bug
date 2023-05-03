import { test } from "vitest";
import { createElement } from "react";

test("Test", () => {
  const elem = createElement("div");
  expect(elem).not.toBeNull();
});
