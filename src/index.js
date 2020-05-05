import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from './serviceWorker';
import {sample, shuffle} from "underscore";

const authors = [
    {
        name: "Mark Twain",
        imageUrl: "images/authors/marktwain.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "The Adventures of Huckleberry Finn",
            "Life on the Mississippi",
            "Roughing it"
        ]
    },
    {
        name: "Joseph Conrad",
        imageUrl: "images/authors/conrad.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "Nostromo",
            "Heart of Darkness",
            "The Secret Agent"
        ]
    },
    {
        name: "Charles Dickens",
        imageUrl: "images/authors/dickens.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "David Copperfield",
            "Oliver Twist",
            "A Tale of Two Cities"
        ]
    },
];

function getTurnData(authors) {
    const allBooks = authors.reduce((acc, author, i) => {
        return acc.concat(author.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    console.log(answer);
    return {
        books: fourRandomBooks,
        author: authors.find(author => author.books.some(title => title === answer))
    }
}

function reducer(
    state={ authors, turnData: getTurnData(authors), highlight:""},
    action) {
        switch (action.type){
            case "ANSWER_SELECTED":
                const isCorrect = state.turnData.author.books.some(book => book === action.answer);
                return Object.assign(
                    {},
                    state, {
                      highlight: isCorrect ? "correct" : "wrong"
                    }
                );
            case "CONTINUE":
                return Object.assign(
                    {},
                    state, {
                        highlight: "",
                        turnData: getTurnData(state.authors)
                    }
                );
            case "ADD_AUTHOR":
                return Object.assign(
                    {},
                    state, {
                        authors: state.authors.concat([action.author])
                    }
                );
            default: return state;
    }
}

let store = Redux.createStore(
                    reducer,
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            );

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <>
                <Route exact path="/" component={AuthorQuiz} />
                <Route exact path="/add" component={AddAuthorForm} />
            </>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
