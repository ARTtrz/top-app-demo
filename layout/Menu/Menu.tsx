import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';

import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion'
import { spawn } from 'child_process';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const shouldReduceMotion = useReducedMotion();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: {
			marginBottom: 0
		}

	}
	const variantsChildren = {
		visible: {
			opacity: 1,
			marginBottom: 10,
			height: 32,
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: 0,

		}

	}


	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened')
				m.isOpened = !m.isOpened;
			}
			return m;
		}))
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory)
		}
	}

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m._id == firstCategory}>
						<Link href={`/${m.route}`}>
							<a >
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m._id == firstCategory
								})}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>

						{m._id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}	>
							<button
								onKeyDown={(key: KeyboardEvent) => ((openSecondLevelKey(key, m._id.secondCategory)))}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expended={m.isOpened}
							>
								{m._id.secondCategory}

							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}

							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}

							</motion.ul>
						</li>
					);
				})}
			</ul>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li key={p._id} variants={variantsChildren}>
					<Link href={`/${route}/${p.alias}`} >
						<a
							tabIndex={isOpened ? 0 : 1}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
							})}
							aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}

						>
							{p.category}
						</a>
					</Link>
				</motion.li>

			))
		)
	}
	return (
		<nav className={styles.m} role='navigation'>
			{announce && <span role='log' className='visualyHidden'>{announce == 'opened' ? '' : ''}</span>}
			{buildFirstLevel()}
		</nav>
	)
}