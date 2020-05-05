import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            books: [],
            bookTemp: ""
        };
        // you have to bind the 2 functions with (this):
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);

    }
    handleSubmit(event){
        event.preventDefault();
        // if you use "this" in a function of a class ==> you have to bind it in the constructor:
        this.props.onAddAuthor(this.state);
    }
    onFieldChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleAddBook(event){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ""
        });
        console.log(this.state.bookTemp);
    }

    render () {
        return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
            </div>
            <div>
                <label htmlFor="imageUrL">Image URL</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
            </div>
            <div>
                {this.state.books.map(book => <p key={book}>{book}</p>)}
                <label htmlFor="bookTemp">Books</label>
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                <input type="button" value="+" onClick={this.handleAddBook} />
            </div>
            <input type="submit" value="Add" />
        </form>
        )
    }
}

function AddAuthorForm ({onAddAuthor}) {
  return (
    <div>
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
  );
}

function mapDispatchToProps(dispatch, props){
    return {
        onAddAuthor: (author) => {
            dispatch({type: "ADD_AUTHOR", author});
            props.history.push("/");
        }
    };
}

//need the withRouter to navigate through the props."history" (l.66)
export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));
// the 1st argument of connect is mapStateToProps but here, the AddAuthorForm has nothing to get from the store.
// So the 1st argument of connect will be an empty function