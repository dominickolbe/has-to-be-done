import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SERNDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doSignIn = async (email, password) => {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      return false;
    }
  }

  getTodos = () => this.db.ref('todos');

  addTodo = (todolistId, todo) =>
    this.db.ref('todolists').child(todolistId).child('todos').push(todo);

  updateTodo = (todolistId, todoId, todo) =>
    this.db.ref('todolists').child(todolistId).child('todos').child(todoId).update(todo);

  deleteTodo = (todolistId, todoId) =>
    this.db.ref('todolists').child(todolistId).child('todos').child(todoId).remove();

  getTodolists = () => this.db.ref('todolists');

  createTodolist = e => this.db.ref('todolists').push(e);

  updateTodolist = (uuid, e) => this.db.ref('todolists').child(uuid).update(e);

}

export default Firebase;
