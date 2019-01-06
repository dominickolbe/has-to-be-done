import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

class App extends Component {

  state = {
    todos: [],
    newTodoValue: '',
  }

  onAddTodo = () => {
    this.setState(state => {
      return {
        todos: [
          ...state.todos,
          {
            title: state.newTodoValue,
            created: new Date(),
            done: false,
          }
        ],
        newTodoValue: '',
      }
    })

  }

  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">

            <List component="nav">

              { this.state.todos.map((todo, key) => (
                <ListItem button key={key}>
                  <ListItemText primary={todo.title} />

                  <ListItemSecondaryAction>
                    <Checkbox />
                  </ListItemSecondaryAction>

                </ListItem>
              ))}

            </List>

            <TextField
              id="name"
              label="Title"
              margin="normal"
              value={this.state.newTodoValue}
              onChange={e => this.setState({ newTodoValue: e.target.value })}
            />

            <Button color="secondary" onClick={this.onAddTodo}>
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
