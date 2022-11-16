import React, { useContext, useState, useEffect } from 'react'
import classes from './Nav.module.scss'
import { NavLink } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SettingsIcon from '@mui/icons-material/Settings'
import { Backdrop } from '../UI/Backdrop'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavigationLink } from './NavLink'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../../context/AuthContext'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useToggle } from '../../hooks/useToggle'

const getTheme = () => {
	const theme = localStorage.getItem('theme')
	return {
		localTheme: theme ? JSON.parse(theme) : null,
	}
}

export const Nav = () => {
	const [hiddenNav, setHiddenNav] = useState(true)
	const { notes, trashNotes, favouriteNotes } = useContext(NotesContext)
	const { isLoggedIn, logout } = useContext(AuthContext)
	const { localTheme: theme1 } = getTheme()
	const [theme, setTheme] = useToggle(theme1)

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme))

		if (theme) {
			document.body.classList.add('light-mode')
		} else {
			document.body.classList.remove('light-mode')
		}
	}, [theme])

	return (
		<>
			<nav onDoubleClick={() => setHiddenNav(false)} className={`${classes.nav} ${hiddenNav ? classes.hiddenNav : ''}`}>
				<button
					onClick={() => setHiddenNav((prev) => !prev)}
					className={`${classes.hideButton} ${hiddenNav ? classes.toggledArrow : ''}`}>
					<ArrowForwardIcon className={`${hiddenNav ? classes.toggledArrow : ''}`} />
				</button>
				<div className={classes.navWrapper}>
					<NavLink to='/' className={classes.logo}>
						{hiddenNav ? (
							<h3>
								<span>N</span>
							</h3>
						) : (
							<h3>
								<span>Notes</span>
								App
							</h3>
						)}
					</NavLink>

					<div className={classes.links}>
						<NavigationLink
							hiddenNav={hiddenNav}
							title='Create new'
							href='/create'
							elementsLength={undefined}
							icon={<AddIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Create</Typography>}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Notes'
							href='/notes'
							elementsLength={notes.length}
							icon={<FormatListBulletedIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Notes</Typography>}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Trash'
							href='/trash'
							elementsLength={trashNotes.length}
							icon={<DeleteOutlineIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Trash</Typography>}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Favourite'
							href='/favourite'
							elementsLength={favouriteNotes.length}
							icon={<FavoriteBorderIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Favourite</Typography>}
						/>
						{isLoggedIn ? (
							<NavigationLink
								title='Account'
								hiddenNav={hiddenNav}
								href='/user'
								elementsLength={undefined}
								icon={<PermIdentityIcon className={classes.icon} />}
								tooltipTitle={<Typography fontSize={11}>Account</Typography>}
							/>
						) : (
							<NavigationLink
								title='Login'
								hiddenNav={hiddenNav}
								href='/login'
								elementsLength={undefined}
								icon={<PermIdentityIcon className={classes.icon} />}
								tooltipTitle={<Typography fontSize={11}>Login</Typography>}
							/>
						)}

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Settings'
							href='/settings'
							elementsLength={undefined}
							icon={<SettingsIcon className={classes.icon} />}
							tooltipTitle={<Typography fontSize={11}>Settings</Typography>}
						/>
						{isLoggedIn && (
							<NavigationLink
								onClick={logout}
								hiddenNav={hiddenNav}
								title='Logout'
								href='/login'
								elementsLength={undefined}
								icon={<LogoutIcon className={classes.icon} />}
								tooltipTitle={<Typography fontSize={11}>Logout</Typography>}
							/>
						)}
						<FormControlLabel
							control={<Switch onClick={setTheme} checked={!theme} />}
							label={
								<Typography
									className={hiddenNav ? classes.hiddenLinkTitle : ''}
									sx={{ color: 'var(--grey-color)', paddingLeft: '0.1rem' }}
									fontSize={17.68}>
									{theme ? 'Light mode' : 'Dark mode'}
								</Typography>
							}
						/>
					</div>
				</div>
			</nav>
			{!hiddenNav && <Backdrop onHideNav={() => setHiddenNav(true)} />}
		</>
	)
}
