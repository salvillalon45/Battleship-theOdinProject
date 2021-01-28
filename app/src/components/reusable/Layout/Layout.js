// -----------------------------------------------
//
// layouts -> layout.js
// Desc: Reusable Layout for all pages
//
// -----------------------------------------------

// -----------------------------------------------
// Redux
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
// -----------------------------------------------

// -----------------------------------------------
// External Imports
import Footer from '../Footer';
import Header from '../Header';

// import Favicon from '../public/favicon.ico';
// -----------------------------------------------

export default function Layout({ children }) {
	return (
		<div className='overallContainer'>
			<Header />

			<main>{children}</main>

			<Footer />
		</div>
	);
}
