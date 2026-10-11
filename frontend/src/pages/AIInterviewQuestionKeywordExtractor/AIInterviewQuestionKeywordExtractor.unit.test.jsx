import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AIInterviewQuestionKeywordExtractor from "./AIInterviewQuestionKeywordExtractor";

// This page is not imported by any route, so `vite build` never compiles it.
// Rendering it here is what catches syntax or runtime errors in the file.
describe("AIInterviewQuestionKeywordExtractor page", () => {
  it("renders the title and the stat tiles", () => {
    render(<AIInterviewQuestionKeywordExtractor />);
    expect(screen.getByText("AI Interview Question Keyword Extractor")).toBeTruthy();
    expect(screen.getByText("Total Keywords")).toBeTruthy();
    expect(screen.getByText("Technical Depth")).toBeTruthy();
    expect(screen.getByText("Breadth Score")).toBeTruthy();
  });

  it("colours the percentage tiles from the numeric score", () => {
    render(<AIInterviewQuestionKeywordExtractor />);
    // technicalDepth = 82 (>= 80) -> green, breadthScore = 65 (>= 60) -> amber
    // (the same percentages also appear in the keyword list, so find each tile by its label)
    const depth = screen.getByText("Technical Depth").nextElementSibling;
    const breadth = screen.getByText("Breadth Score").nextElementSibling;
    expect(depth.textContent).toBe("82%");
    expect(depth.className).toContain("text-green-600");
    expect(breadth.textContent).toBe("65%");
    expect(breadth.className).toContain("text-amber-500");
  });

  it("uses a fixed colour for the keyword count, which is not a score", () => {
    render(<AIInterviewQuestionKeywordExtractor />);
    const count = screen.getByText("Total Keywords").nextElementSibling;
    expect(count.textContent).toBe("8");
    expect(count.className).toContain("text-indigo-600");
    expect(count.className).not.toContain("text-red-500");
  });

  it("lets the user edit the question", () => {
    render(<AIInterviewQuestionKeywordExtractor />);
    const box = screen.getByPlaceholderText("Paste your interview question here...");
    fireEvent.change(box, { target: { value: "Explain the CAP theorem." } });
    expect(box.value).toBe("Explain the CAP theorem.");
  });
});