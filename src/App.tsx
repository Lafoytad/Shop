import React from "react";
import "./App.css";
import BaseButton from "./modules/components/BaseButton";
import { ReactComponent as Cart } from "./assets/Cart.svg";

function App() {
    return (
        <div className="App" style={{ marginTop: 100 }}>
            <BaseButton icon={<Cart />} counter={0} />
        </div>
    );
}

export default App;
