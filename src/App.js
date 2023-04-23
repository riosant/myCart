import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css"
import Header from "./Header";
import Products from "./components/Products";
import Footer from "./Footer";
import {Provider} from "react-redux"
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import {Container} from "react-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Provider store={store}>
                    <Header/>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Products/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="/order-success" element={<OrderSuccess/>}/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </Container>
                    <Footer/>
                </Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
