import React, { FC } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BaseButton from "../BaseButton";
import { ReactComponent as Cart } from "../../../assets/Cart.svg";
import style from "./Header.module.scss";
import { useAppSelector } from "../../../hooks/redux";

const Header: FC = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const navigate = useNavigate();

    return (
        <>
            <header className={style.header}>
                <div className={style.container}>
                    <div className={style.logo}>
                        <img src="https://via.placeholder.com/100" alt="logo" />
                    </div>
                    <nav className={style.nav}>
                        <ul>
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/catalog"}>Catalog</Link>
                            </li>
                            <li>
                                <Link to={"about"}>About</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={style.cart}>
                        <BaseButton
                            className={style.button}
                            icon={<Cart />}
                            onClick={() => navigate("/cart")}
                            counter={cart.length}
                        />
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
