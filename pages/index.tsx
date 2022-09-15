import React, { useState } from 'react';
import { View, IconButton } from 'vcc-ui';
import cars from '../public/api/cars.json';
import DotsIcon from '../src/components/Icons/dots';
import ProductCard from '../src/components/ProductCard';

export default function HomePage() {
    const [isVisible, setIsVisible] = useState<string | null>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const length: number = cars.length;
    const indexArr: number[] = [];
    const dotsArr: string[] = [];

    const handleClickNext = (): void => {
        setStartIndex(startIndex === length - 1 ? 0 : startIndex + 1);
    };

    const handleClickPrev = (): void => {
        setStartIndex(startIndex === 0 ? length - 1 : startIndex - 1);
    };

    for (let i = 0; i < 4; i++) {
        indexArr.push(startIndex + i);
    }

    for (let i = 0; i < cars.length; i++) {
        dotsArr.push(cars[i].id);
    }

    const handleIsVisible = (id: string): void => {
        setIsVisible(id);
    };

    return (
        <div className="home-page">
            <View
                direction="row"
                extend={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    overflow: 'hidden',
                    '@media (max-width: 480px)': {
                        overflowX: 'scroll',
                        scrollbarWidth: 'none',
                        '::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                }}
            >
                {cars.map((car, index) => {
                    const showCar = indexArr.includes(index);
                    return (
                        <ProductCard
                            key={index}
                            data={car}
                            show={showCar}
                            handleIsVisible={handleIsVisible}
                        ></ProductCard>
                    );
                })}
            </View>
            <View
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                extend={{
                    marginTop: '20px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    '@media (max-width: 480px)': {
                        display: 'none',
                    },
                }}
            >
                <IconButton
                    disabled={startIndex === 0}
                    onClick={handleClickPrev}
                    aria-label="prev"
                    iconName="navigation-chevronback"
                    variant="outline"
                />
                <IconButton
                    disabled={startIndex + 4 === length}
                    onClick={handleClickNext}
                    aria-label="next"
                    iconName="navigation-chevronforward"
                    variant="outline"
                />
            </View>
            <View
                spacing={1}
                direction="row"
                justifyContent="center"
                extend={{
                    marginTop: '20px',
                    display: 'none',
                    '@media (max-width: 480px)': {
                        display: 'flex',
                    },
                }}
            >
                {dotsArr.map((id, index) => {
                    return <DotsIcon key={index} filled={isVisible === id} />;
                })}
            </View>
        </div>
    );
}
