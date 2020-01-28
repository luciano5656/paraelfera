import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
const Editor = React.lazy(() => import('./components/editor/Editor'))
const Todo = React.lazy(() => import('./components/todo/Todo'))
const Contact = React.lazy(() => import('./components/Contact'))

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Fera Challenges</h1>
        </header>
        <NavBar />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/editor">
                <Editor
                  commands={[
                    { name: 'bold', htmlElement: 'b' },
                    { name: 'italic', htmlElement: 'i' },
                    { name: 'underline', htmlElement: 'u' },
                  ]}
                />
              </Route>
              <Route path="/contact">
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              </Route>
            </Switch>
          </Suspense>
        </main>
        <footer>
          Luciano Castro - 2020
        </footer>
      </div>
    </Router>
  );
}

export default App;
