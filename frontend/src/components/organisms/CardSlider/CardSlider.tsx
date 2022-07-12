import React, { ReactElement } from 'react';
import styles from './CardSlider.module.scss';
import clsx from 'clsx';
import { Slider } from '../../organisms/Slider/Slider';
import { Icon } from '../../primitives/Icon/Icon';

export interface CardSliderProps {
    data: CardData[];
}

interface CardData {
    id: number;
    title: string;
    description: string;
}

interface CardProps {
    e: CardData;
    className?: string;
}

const Card = ({ e, className }: CardProps): ReactElement => (
    <div className={clsx('w-60 tablet:w-96 h-40 p-8 bg-grey rounded-md shadow-lg', className)}>
        <h2 className="text-4xl">{e.title}</h2>
        <p className="text-lg mt-2">{e.description}</p>
    </div>
);

const CardSlider = ({ data }: CardSliderProps): ReactElement => (
    <Slider
        className="pt-8"
        sliderClassName="px-8 py-8"
        controls="top"
        controlsClassName="flex justify-end px-8"
        leftBtnContent={<Icon name="arrowLeft" className="w-8" />}
        leftBtnClassName={clsx(styles.button, 'mr-4')}
        rightBtnContent={<Icon name="arrowRight" className="w-8" />}
        rightBtnClassName={styles.button}
    >
        {data.map((e) => (
            <Card key={e.id} e={e} className="mr-8 last:mr-0" />
        ))}
    </Slider>
);

export { CardSlider };
