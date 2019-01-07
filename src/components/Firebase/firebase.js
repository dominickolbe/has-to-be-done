import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCbw3a5hogvqH4A6Y1h9sti_KFWNiXleaY',
  authDomain: 'has-to-be-done.firebaseapp.com',
  databaseURL: 'https://has-to-be-done.firebaseio.com',
  projectId: 'has-to-be-done',
  storageBucket: '',
  messagingSenderId: '473661323208',
};

class Firebase {

  constructor() {
    app.initializeApp(config);

    this.db = app.database();
  }

  getTodos = () => this.db.ref('todos');
  addTodo = e => this.db.ref('todos').push(e);
  updateTodo = async (uuid, e) => {
    try {
      await this.db.ref('todos').child(uuid).update(e);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default Firebase;
