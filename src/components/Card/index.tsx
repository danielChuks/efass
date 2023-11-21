import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface cardProps {
    title: string;
    content: string;
    image: any;
}

function Card({ title, content, image }: cardProps) {
    return (
        <div className={styles['card-container']}>
            <div className={styles['image-title-container']}>
                {image} 
                <div>{title}</div>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default Card;
