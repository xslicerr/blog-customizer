import { Button } from 'src/ui/button';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
	isOpenForm: boolean;
};

export const ArticleParamsForm = forwardRef(
	(
		{ onApply, isOpenForm }: ArticleParamsFormProps,
		ref: React.ForwardedRef<HTMLDivElement>
	) => {
		const [updatedState, setUpdatedState] =
			useState<ArticleStateType>(defaultArticleState);

		const handleSubmit = (e: React.FormEvent): void => {
			e.preventDefault();
			onApply(updatedState);
		};

		const handleReset = (): void => {
			setUpdatedState(defaultArticleState);
			onApply(defaultArticleState);
		};

		const handleChangeFontFamily = (newValue: OptionType): void => {
			setUpdatedState((prevObject) => {
				return { ...prevObject, fontFamilyOption: newValue };
			});
		};

		const handleChangeFontSize = (newValue: OptionType): void => {
			setUpdatedState((prevObject) => {
				return { ...prevObject, fontSizeOption: newValue };
			});
		};

		const handleChangeFontColor = (newValue: OptionType): void => {
			setUpdatedState((prevObject) => {
				return { ...prevObject, fontColor: newValue };
			});
		};

		const handleChangeBackgroundColor = (newValue: OptionType): void => {
			setUpdatedState((prevObject) => {
				return { ...prevObject, backgroundColor: newValue };
			});
		};

		const handleChangeContentWidth = (newValue: OptionType): void => {
			setUpdatedState((prevObject) => {
				return { ...prevObject, contentWidth: newValue };
			});
		};

		return (
			<>
				<aside
					ref={ref}
					className={clsx(styles.container, {
						[styles.container_open]: isOpenForm,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title={'шрифт'}
							placeholder={'шрифт'}
							options={fontFamilyOptions}
							selected={updatedState.fontFamilyOption}
							onChange={handleChangeFontFamily}
						/>
						<RadioGroup
							title={'размер шрифта'}
							name={'размер шрифта'}
							options={fontSizeOptions}
							selected={updatedState.fontSizeOption}
							onChange={handleChangeFontSize}
						/>
						<Select
							title={'цвет шрифта'}
							placeholder={'цвет шрифта'}
							options={fontColors}
							selected={updatedState.fontColor}
							onChange={handleChangeFontColor}
						/>
						<Separator />
						<Select
							title={'цвет фона'}
							placeholder={'цвет фона'}
							options={backgroundColors}
							selected={updatedState.backgroundColor}
							onChange={handleChangeBackgroundColor}
						/>
						<Select
							title={'ширина контента'}
							placeholder={'ширина контента'}
							options={contentWidthArr}
							selected={updatedState.contentWidth}
							onChange={handleChangeContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</>
		);
	}
);
ArticleParamsForm.displayName = 'ArticleParamsForm';
