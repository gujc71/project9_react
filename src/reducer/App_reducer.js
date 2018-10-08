import { createAction, handleActions } from 'redux-actions';
import {firestore, firebaseAuth} from './Firestore';

// action type
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const SNACKBAR = 'SNACKBAR';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'READ';
const BOARD_LIST = 'LIST'; 
const BOARD_ADDS = 'ADDS';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export const show_snackbar = createAction(SNACKBAR);

export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, brdno => brdno);
export const board_read = createAction(BOARD_READ);
export const board_list = createAction(BOARD_LIST);
export const board_adds = createAction(BOARD_ADDS);

export const firebase_login = (email, pw) =>{
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function firebase_logout () {
  return (dispatch) => {
    firebaseAuth().signOut();
    dispatch(logout());
  }  
}

export const firebase_register = (email, pw) =>{
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(function() {
    var uid = firebaseAuth().currentUser.uid;

    var user = {
      uid: uid,
      userid: email,
      usernm: email,
      usermsg: ''
    };
    firestore.collection('users').doc(uid).set(user);
    login(uid);
  })
}

export const firebase_board_list = () =>{
  return (dispatch) => {
    return firestore.collection("boards").orderBy("brddate", "desc")
        .onSnapshot(function(snapshot) {
            var newlist = [];
            snapshot.docChanges().forEach(function(change) {
                var row = change.doc.data();
                if (change.type === "added") {
                    newlist.push(row);
                } else
                if (change.type === "modified") {
                    dispatch(board_save(row));
                } else
                if (change.type === "removed") {
                    dispatch(board_remove(row.brdno));
                }
            });
            if (newlist.length>0) dispatch(board_adds(newlist));
        });
    }
}

export const firebase_board_delete = ( brdno = {}) => {
  return firestore.collection('boards').doc(brdno).delete();
};

export const firebase_board_save = ( data = {}) => {
  return (dispatch) => {
    console.log(data);
    if (!data.brdno) {
      firestore.collection("users").doc(data.uid).get()
      .then(doc => {
        const user = doc.data();
        var newdoc = firestore.collection('boards').doc();
        data.brdwriter = user.usernm;
        data.brdno = newdoc.id;
        data.brddate = Date.now();
        newdoc.set(data);
      });
    } else {
      firestore.collection('boards').doc(data.brdno).update(data);  
    }
  }
};

const initialState = {
  uid: null,
  boards: [], 
  selectedBoard: {},
  snackbarOpen: false,
  message: '', 
};

export default handleActions({
  [LOGIN]: (state, { payload: uid }) => {
    return {...initialState, uid: uid};
  },
  [LOGOUT]: () => {
    return initialState;
  },
  [SNACKBAR]: (state, { payload: data }) => {
    return {...state, snackbarOpen: data.snackbarOpen, message: data.message };
  },
  [BOARD_LIST]: (state, { payload: data }) => {
    return {...state, boards: data, selectedBoard: {} };
  },
  [BOARD_SAVE]: (state, { payload: data }) => {
    let boards = state.boards;
    let inx = boards.findIndex(row => row.brdno === data.brdno);
    if (inx===-1) {                          // new : Insert
      let newboards = [{date: new Date(), ...data }]
      return {...state, boards: newboards.concat(boards), selectedBoard: {} };
    } else {                               // Update
      boards[inx]=data;
      return {...state, boards: boards, selectedBoard: {} };
    }  
  },
  [BOARD_ADDS]: (state, { payload: data }) => {
    let boards = state.boards;
    return {...state, boards: data.concat(boards), selectedBoard: {} };
  },
  [BOARD_REMOVE]: (state, { payload: brdno }) => {
    let boards = state.boards;
    return {...state, boards: boards.filter(row => row.brdno !== brdno), selectedBoard: {} };
  },
  [BOARD_READ]: (state, { payload: brdno }) => {
    let boards = state.boards;
    let selectedBoard = boards.find(row => row.brdno === brdno);
    if (!selectedBoard) selectedBoard = {brdno:null, brdtitle:'', brdcontents:''};
    return {
      ...state,
      selectedBoard: selectedBoard
    };
  }
}, initialState);
