import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import s from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ProductItem from "../../components/ProductItem";
import BaseButton from "../../components/BaseButton";
import { ReactComponent as Close } from "../../../assets/Close.svg";
import SendModal from "../../components/SendModal";
import { cartSlice } from "../../../store/reducers/cartReducer";
import { TData } from "../../../types/formTypes";

const Cart: FC = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const [modal, setModal] = useState<Boolean>(false);

    const sendCartData = (formValue: TData) => {
        const data = {
            user: formValue,
            cart,
        };

        console.log(data);
    };

    return (
        <main className={s.cart}>
            <section className={s.container}>
                <h2 className={s.title}>Корзина товаров</h2>
                {!cart.length && <p className={s.empty}>Корзина пуста</p>}
                {!!cart.length && (
                    <>
                        <div className={s.items}>
                            {cart.map((item) => (
                                <ProductItem item={item} className={s.cartItem}>
                                    <BaseButton
                                        onClick={() =>
                                            dispatch(
                                                cartSlice.actions.removeItem(
                                                    item.id
                                                )
                                            )
                                        }
                                        icon={<Close />}
                                        className={s.remove}
                                    />
                                </ProductItem>
                            ))}
                        </div>
                        <BaseButton
                            className={s.openModal}
                            onClick={() => setModal(true)}
                            value="Оформить заказ"
                        />
                    </>
                )}
                {createPortal(
                    <SendModal
                        open={modal}
                        setOpen={setModal}
                        setFormData={sendCartData}
                    />,
                    document.body
                )}
            </section>
        </main>
    );
};

export default Cart;
