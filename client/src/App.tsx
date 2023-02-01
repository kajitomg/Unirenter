import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Homepage } from './pages/Homepage/Homepage'
import { Galery } from './pages/Galery/Galery'
import { Footer } from './components/Footer/Footer'
import { Provider } from 'react-redux'
import { store } from './store'
import { Ceo } from './components/Ceo'
import { Catalog } from './pages/Catalog/Catalog'
import { Page } from './components/Page/Page'
import { Interactive } from './components/Interactive/Interactive'
import { Path } from './components/Path/Path'
import { Content } from './components/Content'
import { Titlecategory } from './components/Titlecategory/Titlecategory'
import { Filterlist } from './components/Filterlist'
import { Applyed } from './components/Applyed'
import { Like } from './pages/Like/Like'
import { Modalsubscribe } from './components/Modal/Modals/Modalsubscribe/Modalsubscribe'
import { useAnimatedShow } from './hooks/useAnimatedShow'
import modalClasses from './components/Modal/Components/Modalwrapper/Modalwrapper.module.scss'
import './styles/App.scss'

const App = () => {

	const [view, setView] = useState(1)
	const { compiledClass: wrapperClass, show: showModal } = useAnimatedShow(modalClasses.root, 200, modalClasses)


	return (
		<Provider store={store}>
			<>
				<BrowserRouter>
					<Page >
						<Modalsubscribe wrapperClass={wrapperClass} showModal={showModal} />
						<Header />
						<Content>
							<Path />
							<Titlecategory />
							<Ceo showModal={showModal} />
							<Filterlist view={view} setView={setView} />
							<Applyed />
							<Routes>
								<Route path='*' element={<Homepage />} />
								<Route path='/catalog' element={<Catalog view={view} setView={setView} />} />
								<Route path='/catalog/:id' element={<Galery />} />
								<Route path='/like' element={<Like view={view} setView={setView} />} />
							</Routes>
							<Interactive showModal={showModal} />
						</Content>
						<Footer />
					</Page>
				</BrowserRouter>
			</>
		</Provider>

	)
}

export default App