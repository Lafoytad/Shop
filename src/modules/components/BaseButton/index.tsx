import classNames from "classnames";
import React, { FC } from "react";
import style from "./BaseButton.module.scss";

type TProps = {
    className?: string;
    onClick?: () => void;
    value?: string;
    icon?: React.ReactElement;
    counter?: number;
    disabled?: boolean;
    type?: "reset" | "submit" | "button";
};

const BaseButton: FC<TProps> = (props) => {
    const { className, onClick, value, icon, counter, disabled, type } = props;

    const mainClass = classNames(className, style.button);

    return (
        <button
            type={type ? type : "button"}
            className={mainClass}
            onClick={onClick}
            disabled={disabled}
        >
            {value ? value : icon}
            {counter !== undefined ? (
                <div className={style.badj}>{counter}</div>
            ) : null}
        </button>
    );
};

export default BaseButton;
