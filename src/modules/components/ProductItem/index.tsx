import React, { FC, useEffect, useState } from "react";
import { TProduct } from "../../../store/reducers/productReducer";
import classNames from "classnames";
import BaseButton from "../BaseButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { cartSlice } from "../../../store/reducers/cartReducer";
import s from "./ProductItem.module.scss";

type TProps = {
    className?: string;
    item: TProduct;
    children?: React.ReactNode;
    link?: () => void;
};

const ProductItem: FC<TProps> = (props) => {
    const { className, item, children, link } = props;
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state) => state.cart);
    const [disable, setDisable] = useState<boolean>(false);

    const mainClass = classNames(className, s.item);

    useEffect(() => {
        if (cart) {
            const state = cart.some(
                (cartItem: TProduct) => cartItem.id === item.id
            );
            setDisable(state);
        }
    }, [cart]);

    return (
        <div className={mainClass}>
            <p className={s.category}>{item.category}</p>
            <div className={s.img} onClick={link}>
                <img src={item.image} alt="img" />
            </div>
            <h3 className={s.title} onClick={link}>
                {item.title}
            </h3>
            <p className={s.price}>{item.price}</p>
            <BaseButton
                className={classNames(
                    s.button,
                    disable ? s.buttonDis : s.button
                )}
                disabled={disable}
                value={disable ? "Added" : "Add to cart"}
                onClick={() => dispatch(cartSlice.actions.setCart(item))}
            />
            {children}
        </div>
    );
};

export default ProductItem;
