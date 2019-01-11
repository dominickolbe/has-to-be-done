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

  addTodo = e => this.db.ref('todos').push(e);

  updateTodo = async (uuid, e) => this.db.ref('todos').child(uuid).update(e);

  deleteTodo = uuid => this.db.ref('todos').child(uuid).remove();

  getTodolists = () => this.db.ref('todolists');

  createTodolist = e => this.db.ref('todolists').push(e);

}

export default Firebase;
