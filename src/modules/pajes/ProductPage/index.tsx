import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import fetchProducts from "../../../store/actions/getProduxts";
import { TProduct } from "../../../store/reducers/productReducer";
import s from "./ProductPage.module.scss";
import Rating from "../../components/Rating";
import BaseButton from "../../components/BaseButton";
import { cartSlice } from "../../../store/reducers/cartReducer";

const ProductPage: FC = () => {
    const { products } = useAppSelector((state) => state.products);
    const { cart } = useAppSelector((store) => store.cart);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [product, setProduct] = useState<null | TProduct>(null);
    const [flag, setFlag] = useState<boolean>(false);
    const [hoverStar, setHoverStar] = useState<number>(3);

    useEffect(() => {
        if (!products) {
            dispatch(fetchProducts());
        }
    }, []);

    useEffect(() => {
        if (!cart.length && id) {
            setFlag(cart.some((item) => item.id === +id));
        }
    }, [cart]);

    useEffect(() => {
        if (products && id) {
            setProduct(products.find((item) => item.id === +id) ?? null);
        }
    }, [products]);

    useEffect(() => {
        if (products) {
            if (id) {
                const data = products.find((item) => item.id === +id);
                if (data) setProduct(data);
            }
        }
    }, [id, products]);

    return (
        <main className={s.product}>
            <div className={s.container}>
                <h2 className={s.title}>{product?.title}</h2>
                <div className={s.productInfo}>
                    <div className={s.img}>
                        <img src={product?.image} alt={product?.title} />
                    </div>
                    <div className={s.descriptionProduct}>
                        <p className={s.category}>{product?.category}</p>
                        <p className={s.description}>{product?.description}</p>
                        <p className={s.price}>{product?.price}</p>
                        <Rating
                            value={hoverStar}
                            color="green"
                            className={s.rating}
                            setRate={(n) => setHoverStar(n)}
                        />
                        {product && (
                            <BaseButton
                                disabled={flag}
                                onClick={() =>
                                    dispatch(cartSlice.actions.setCart(product))
                                }
                                value="Добавить в корзину"
                                className={s.button}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
