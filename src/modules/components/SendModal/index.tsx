import React, { FC } from "react";
import s from "./SendModal.module.scss";
import BaseButton from "../BaseButton";
import { ReactComponent as Close } from "../../../assets/Close.svg";
import { useFormik } from "formik";
import { TData } from "../../../types/formTypes";

type TProps = {
    open: Boolean;
    setOpen: (val: Boolean) => void;
    setFormData: (data: TData) => void;
};

const SendModal: FC<TProps> = (props) => {
    const { open, setOpen, setFormData } = props;

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
        onSubmit: (values) => {
            console.log(values);
            setFormData(values);
            setOpen(false);
        },
    });

    const { handleSubmit, handleChange } = formik;

    const handleClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        if (
            target.parentElement?.classList.contains(s.close) ||
            target.classList.contains(s.modal)
        ) {
            setOpen(false);
        }
    };

    if (!open) return null;

    return (
        <div className={s.modal} onClick={handleClose}>
            <div className={s.modalConteiner}>
                <div className={s.header}>
                    <p className={s.title}>Оформление заказа</p>
                    <BaseButton className={s.close} icon={<Close />} />
                </div>
                <div className={s.body}>
                    <form onSubmit={handleSubmit} className={s.form}>
                        <input
                            name="name"
                            type="text"
                            onChange={handleChange}
                            placeholder="Имя"
                        />
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="email"
                        />
                        <input
                            name="phone"
                            type="tel"
                            onChange={handleChange}
                            placeholder="Телефон"
                        />
                        <textarea
                            name="message"
                            onChange={handleChange}
                            placeholder="Сообщение"
                        ></textarea>
                        <BaseButton
                            className={s.sendButton}
                            type="submit"
                            value="Отправить"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendModal;
