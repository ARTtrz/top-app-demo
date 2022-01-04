
import { motion, useAnimation } from 'framer-motion';
import { useAnimatedState } from 'framer-motion/types/animation/use-animated-state';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';
import UpIcon from './up.svg';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY()

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls])
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	};


	return (
		<motion.div
			className={styles.up}

			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon apperance='primary' icon='up' aria-label="Навверх" onClick={scrollToTop} />
		</motion.div>

	)
}