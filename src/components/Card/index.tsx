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
                <div>{title}</div>
                {image}
            </div>
            <div className={styles['card-content']}>{content}</div>
        </div>
    );
}

export default Card;
