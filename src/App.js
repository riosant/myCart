import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "./assets/css/style.css"
import Header from "./Header";
import Products from "./components/Products";
import {MDBContainer} from "mdb-react-ui-kit";
import Footer from "./Footer";
import {Provider} from "react-redux"
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Checkout from "./components/Checkout";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Provider store={store}>
                    <Header/>
                    <MDBContainer>
                        <Routes>
                            <Route path="/" element={<Products/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </MDBContainer>
                    <Footer/>
                </Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;