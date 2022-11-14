import React, { useContext, useState } from 'react'
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
import { NavigationLink } from './NavLink'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Nav = () => {
	const [hiddenNav, setHiddenNav] = useState(true)
	const { notes, trashNotes, favouriteNotes } = useContext(NotesContext)
	const { isLoggedIn, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const logoutHandler = () => {
		logout()
		navigate('/login')
	}

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
								tooltipTitle={<Typography fontSize={11}>Login</Typography>}
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
					</div>
					{isLoggedIn && (
						<button onClick={logoutHandler} type='button'>
							Logout
						</button>
					)}
				</div>
			</nav>
			{!hiddenNav && <Backdrop onHideNav={() => setHiddenNav(true)} />}
		</>
	)
}
