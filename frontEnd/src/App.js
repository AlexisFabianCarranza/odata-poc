import React from 'react';
import BookItemList from './BookItemList';
import AddBookItem from './AddBookItem';
import './App.css';
import EditBookItem from './EditBookItem';
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      id: null,
      userId: 1,
      book: '',
      cost: '',
      bookItem: {},
      bookItems: [],
      editing: false
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteBookItem = this.deleteBookItem.bind(this);
    this.addBookItem = this.addBookItem.bind(this);
    this.editBookItem = this.editBookItem.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.updateBookItem = this.updateBookItem.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
 
    this.setState({
      [name]:value
    })
  }

  addBookItem(event){
    event.preventDefault()
    if (!this.state.book) return;
    const bookItem = {
      id: this.state.bookItems.length + 1,
      book: this.state.book,
      cost: this.state.cost,
      userId: this.state.userId,
      enStock: this.state.enStock
    };

    console.log(bookItem);
    this.setState({
      book: '',
      cost: '',
      bookItem: bookItem,
      bookItems: [...this.state.bookItems, bookItem]
    })
    console.log(this.state.bookItems);
  }

  deleteBookItem(id) {
    const bookItems = this.state.bookItems.filter( item => item.id !== id );
    this.setState({bookItems: bookItems});
    if(this.state.editing === true) {
      window.location.reload();
    }
  }

  editBookItem(bookItem) {
    this.setEditing(true);
    this.setState({
      book:bookItem.book,
      cost:bookItem.cost,
      bookItem: bookItem
    });
    console.log(bookItem);
  }

  setEditing(value) {
    if(typeof value !== 'boolean') { throw " This value must either be true or false"}
    this.setState({
      editing: value
    })
  }

  updateBookItem(event) {
    event.preventDefault();
    const updatedBook = this.state.book;
    const updatedCost = this.state.cost;
    const updatedBookItem = Object.assign({}, this.state.bookItem, { book: updatedBook, cost: updatedCost })
    const bookItems = this.state.bookItems.map((bookItem) => (bookItem.id === this.state.bookItem.id ? updatedBookItem : bookItem));
    this.setState({ book:'', cost: '', bookItems: bookItems});
  }

  render() {
    const { cost, book, bookItems, editing } = this.state;
      return (
        <div className="App">
          <div className="row App-main">
            <BookItemList
              bookItems= {bookItems}
              deleteBookItem={this.deleteBookItem}
              boughtBookItem={this.boughtBookItem}
              editBookItem={this.editBookItem}
            />
          </div>
          <div className="row App-main">
          { 
            editing  ? (
            <EditBookItem
             book={this.state.book}
             cost={this.state.cost} 
             handleInputChange={this.handleInputChange}
             setEditing={this.setEditing}
             updateBookItem={this.updateBookItem}
            />
            ) : (
            <AddBookItem
              book={this.state.book}
              cost={this.state.cost} 
              handleInputChange={this.handleInputChange} 
              addBookItem={this.addBookItem}
            />
            )
          }
          </div>
        </div>
      );
    }
}


/*function App(data) {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}*/

export default App;