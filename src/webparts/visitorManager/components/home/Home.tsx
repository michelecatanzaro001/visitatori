import * as React from 'react';
 
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin, memoryLocationPlugin, servicesPlugin, UIRouterReact } from "@uirouter/react";
import * as ReactDOM from 'react-dom';
import { CommandBarBasicExample } from './CommandBarBasic';
 
 
import { createRouterMiddleware, routerReducer } from '@uirouter/redux';
import { ConnectedUIRouter } from '@uirouter/redux/lib/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

 
const Hello = () => <h3>hello world</h3>;
const About = () => <h3>Its the UI-Router hello world app!</h3>;

const App = () => {
  const activeClass = "active";
  const helloSref = useSrefActive("hello", null, activeClass);
  const aboutSref = useSrefActive("about", null, activeClass);

  return (
    <div>
      <CommandBarBasicExample></CommandBarBasicExample>
      <UIView />
    </div>
  );
};
  
 
export default class Home extends React.Component<any,any>  {

    constructor(prop: any) {
        super(prop);

        // Instantiate the Router
        const router = new UIRouterReact();

        // Create the Redux middleware by passing it
        const routerMiddleware = createRouterMiddleware(router);

        // Create the Redux reducer
        const reducer = combineReducers({
        // ... your reducers
        router: routerReducer,
        });

        // And finally create the Redux store
        const store = createStore(reducer, applyMiddleware(routerMiddleware));

        this.state = {
            store : store,
            router : router,
            helloState : { name: "hello" , component: Hello },
            aboutState : { name: "about" , component: About }
        }
    }
    public render(): React.ReactElement  {
      return (
        <Provider store={this.state.store}>
         <ConnectedUIRouter
             router={this.state.router}
             plugins={[memoryLocationPlugin]}
             states={[this.state.helloState, this.state.aboutState]}>
          <App/>
          </ConnectedUIRouter>
        </Provider>
     
      );
    }
  }
  