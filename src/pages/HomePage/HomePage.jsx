/*шаблон сторінки для корекції  */

// import Header from '../../components/Header/Header.jsx'
import SideBar from '../../components/SideBar/SideBar.jsx'
import ScreensPage from '../ScreensPage/ScreensPage'
import s from './HomePage.module.css'
const HomePage = () => (
	<div className={s.homePage}>
		{/* <Header /> */}
		<SideBar />

		<ScreensPage />
	</div>
)

export default HomePage
