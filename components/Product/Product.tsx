import { ProductProps } from './Product.props'
import styles from './Product.module.css';
import cn from 'classnames'
import { Card } from '../Card/Card';
import { Button, Divider, Rating, Review, ReviewForm, Tag } from '..';

import { declOfNum, priceRu } from '../../helpers/helpers';

import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);
	const variants = {
		visible: { height: 'auto', opacity: '1' },
		hidden: { height: 0, opacity: 0, }
	}
	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus()
	}
	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<img
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}

					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{product.price && priceRu(product.price)}
					{product.oldPrice && <Tag className={styles.oldP} color='green'>{product.price && priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>{product.credit && priceRu(product.credit)}/<span className={styles.month}>мес</span></div>

				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag color='ghost' className={styles.category} key={c}>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>


						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						{product.advantages}

					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						{product.disadvantages}

					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />

				<div className={styles.actions}>
					<Button apperance='primary' className={styles.firstB}>Узнать подробнее</Button>
					<Button
						apperance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
						aria-expanded={isReviewOpened}
					>Читать отзывы</Button>

				</div>



			</Card>
			<motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
				<Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 1 : 0}>
					{product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
					))}
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</div>
	)
}));