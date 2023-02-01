import React, { FC } from 'react'
import { Changer } from '../../../../models/Changer';
import { Content } from '../../../../models/Contents';
import { Loader } from '../../../Loader';
import { SPContent } from '../SPContent';
import classes from './SPContentWrapper.module.scss'

interface SPContentWrapperProps {
	changers: Changer[];
	content: Content[] | null;
	loading: boolean;
}

const SPContentWrapper: FC<SPContentWrapperProps> = ({ changers, content, loading }) => {

	const mokeData = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]

	return (
		<section className={classes.root}>
			{
				loading
					?
					mokeData.map((data, index) =>
						<div className={classes.loading} key={index}>
							<div>
								<Loader />
							</div>
							<div>
								<Loader />
							</div>
						</div>
					)
					:
					content?.map(element =>
						<SPContent changers={changers} element={element} key={element._id} />
					)
			}
			{
				!loading && content?.length === 0 &&
				<div className={classes.empty}><span>Категория не выбрана</span></div>
			}

		</section>
	)
}

export { SPContentWrapper }