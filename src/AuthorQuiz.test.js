import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Enzyme, {mount, shallow, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const state = {
    turnData: {
        books: [
            "The Adventures of Huckleberry Finn",
            "Life on the Mississippi",
            "blabla",
            "bloblo",
            "coucou",
            "hello"
        ],
        author: {
            name: "Mark Twain",
            imageUrl: "images/authors/marktwain.jpg",
            imageSource: "Wikimedia Commons",
            books: [
                "The Adventures of Huckleberry Finn",
                "Life on the Mississippi",
                "Roughing it"
            ]
        }
    },
    highlight: "none"
}

describe('AuthorQuiz', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    })
});