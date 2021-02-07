// -----------------------------------------------
//
// reusable -> layout.js
// Desc: Reusable Layout for all pages
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import { Fragment } from 'react';

// Reusable
import Footer from '../Footer';
import Header from '../Header';
// -----------------------------------------------

export default function Layout({ children }) {
	return (
		<>
			<Header />

			<main>{children}</main>

			<Footer />
		</>
	);
}
