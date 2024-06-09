import React, { FC, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Star } from "../../../assets/star.svg";
import { ReactComponent as StarFill } from "../../../assets/starFill.svg";

type TProps = {
    value: number;
    disable?: boolean;
    onClick?: () => void;
    onMouesover?: () => void;
    icon?: React.ReactElement;
    iconFill?: React.ReactElement;
    cout?: number;
    color?: string;
    className?: string;
    setRate?: (n: number) => void;
};

type TStyle = {
    color?: string;
    hover?: boolean;
};

const StyleFillWrapper = styled.div<TStyle>`
    & svg {
        transform: scale(${(p) => (p.hover ? 1.2 : 1)});
        transition: transform 0.3s;
        path {
            fill: ${(p) => p.color};
            stroke: ${(p) => p.color};
        }
    }
`;

const StyleWrapper = styled.div<TStyle>`
    & svg {
        transform: scale(${(p) => (p.hover ? 1.2 : 1)});
        path {
            stroke: ${(p) => p.color};
        }
    }
`;

const RatingContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const Rating: FC<TProps> = (props) => {
    const {
        value,
        cout = 5,
        disable,
        icon,
        iconFill,
        onClick,
        onMouesover,
        color,
        className,
        setRate,
    } = props;

    const [hover, setHover] = useState<number>(-1);

    return (
        <RatingContainer className={className}>
            {Array(cout)
                .fill(0)
                .map((item: number, index: number) => (
                    <div
                        key={index.toString()}
                        onClick={() => (setRate ? setRate(index + 1) : null)}
                        onMouseEnter={() => (!disable ? setHover(index) : null)}
                        onMouseLeave={() => (!disable ? setHover(-1) : null)}
                    >
                        {index + 1 <= value ? (
                            iconFill ?? (
                                <StyleFillWrapper
                                    hover={hover === index}
                                    color={color}
                                >
                                    {iconFill ?? <StarFill />}
                                </StyleFillWrapper>
                            )
                        ) : (
                            <StyleWrapper hover={hover === index} color={color}>
                                {icon ?? <Star />}
                            </StyleWrapper>
                        )}
                    </div>
                ))}
        </RatingContainer>
    );
};

export default Rating;
