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

export const Nav = () => {
	const [hiddenNav, setHiddenNav] = useState<boolean>(true)
	const { notes, trashNotes, favouriteNotes } = useContext(NotesContext)

	return (
		<>
			<nav className={`${classes.nav} ${hiddenNav ? classes.hiddenNav : ''}`}>
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
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Notes'
							href='/notes'
							elementsLength={notes.length}
							icon={<FormatListBulletedIcon className={classes.icon} />}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Trash'
							href='/trash'
							elementsLength={trashNotes.length}
							icon={<DeleteOutlineIcon className={classes.icon} />}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Favourite'
							href='/favourite'
							elementsLength={favouriteNotes.length}
							icon={<FavoriteBorderIcon className={classes.icon} />}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Settings'
							href='/settings'
							elementsLength={undefined}
							icon={<SettingsIcon className={classes.icon} />}
						/>

						<NavigationLink
							hiddenNav={hiddenNav}
							title='Login'
							href='/login'
							elementsLength={undefined}
							icon={<PermIdentityIcon className={classes.icon} />}
						/>
					</div>
				</div>
			</nav>
			{!hiddenNav && <Backdrop onHideNav={() => setHiddenNav(true)} />}
		</>
	)
}
