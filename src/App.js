import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Views from './views';
import {Route, Switch} from 'react-router-dom';
import Socket from "./socket/Socket";


const App = () => {
  const dispatch = useDispatch()
  const dispatchAction = (action) => {
    console.log("action: ", action)
    dispatch(action)
  }
  useEffect(() => {
    Socket.onConnect()
    Socket.onGetActiveUsers(dispatchAction)
    Socket.onCreateNewChat(dispatchAction)
    Socket.onGetChats(dispatchAction)
  })
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Views}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
