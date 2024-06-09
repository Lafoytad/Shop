import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import fetchProducts from "../../../store/actions/getProduxts";
import { TProduct } from "../../../store/reducers/productReducer";
import ProductItem from "../../components/ProductItem";
import s from "./catalog.module.scss";
import httpClient from "../../../Utils/httpsClient";
import { useNavigate } from "react-router-dom";

const Catalog: FC = () => {
    const { error, loading, products } = useAppSelector(
        (state) => state.products
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

    const filterHandler = (e: React.ChangeEvent, value: string) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            setCategory([...category, value]);
        } else {
            setCategory(category.filter((item) => item !== value));
        }
    };

    useEffect(() => {
        console.log(category);
        if (products) {
            if (category.length === 0) {
                setFilteredProducts(products);
                return;
            }
            const data = products.filter((item: TProduct) => {
                if (category.includes(item.category)) return item;
            });
            setFilteredProducts(data);
        }
    }, [category]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        const getCategory = async () => {
            const resp = await httpClient.get("/products/categories");
            setCategoryList(resp.data);
        };
        getCategory();
    }, []);

    return (
        <main className={s.catalog}>
            <section className={s.container}>
                <h2 className={s.title}>Catalog</h2>
                <div className={s.filter}>
                    {categoryList.map((item: string, i) => (
                        <div key={i.toString()}>
                            <input
                                type="checkbox"
                                id={item}
                                onChange={(e) => filterHandler(e, item)}
                            />
                            <label htmlFor={item}>{item}</label>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div style={{ textAlign: "center" }}>Loading...</div>
                )}
                <div className={s.catalogItems}>
                    {filteredProducts &&
                        filteredProducts.map((item: TProduct) => (
                            <ProductItem
                                link={() => navigate(`/catalog/${item.id}`)}
                                key={item.id}
                                className={s.item}
                                item={item}
                            />
                        ))}
                </div>
            </section>
        </main>
    );
};

export default Catalog;
