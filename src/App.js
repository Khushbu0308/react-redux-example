import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Cart from "./component/Cart";
import MyComponent from "./component/ReactTable";
import Hooks from "./component/Hooks";


function App() {
  return (
    <Provider store={store}>
      {/* <Cart /> */}
      <MyComponent />
      {/* <Hooks /> */}
    </Provider>
  );
}

export default App;
