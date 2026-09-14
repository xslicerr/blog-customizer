import { CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './app.module.scss';

export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const mainRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef: mainRef,
		onChange: setIsOpenForm,
	});

	const handleOpenFormClick = (): void => {
		setIsOpenForm((prev) => !prev);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton isOpen={isOpenForm} onClick={handleOpenFormClick} />
			<ArticleParamsForm
				onApply={setAppliedState}
				isOpenForm={isOpenForm}
				ref={mainRef}
			/>
			<Article />
		</main>
	);
};
