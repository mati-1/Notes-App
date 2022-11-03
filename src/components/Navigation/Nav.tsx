import React, { useContext, useState } from 'react'
import classes from './Nav.module.scss'
import { NavLink } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'
import { Badge } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SettingsIcon from '@mui/icons-material/Settings'
import { Backdrop } from '../UI/Backdrop'

export const Nav = () => {
	const [hiddenNav, setHiddenNav] = useState<boolean>(true)
	const { notes, trashNotes } = useContext(NotesContext)

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
						<span>Notes</span> <br /> App
					</NavLink>

					<div className={classes.links}>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/create'>
							<AddIcon className={classes.icon} />{' '}
							<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>Create new</span>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/notes'>
							<Badge badgeContent={notes.length} color='primary'>
								<FormatListBulletedIcon className={classes.icon} />
								<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>Notes</span>
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/trash'>
							<Badge badgeContent={trashNotes.length} color='primary'>
								<DeleteOutlineIcon className={classes.icon} />{' '}
								<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>Trash</span>
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/favourite'>
							<Badge badgeContent={null} color='primary'>
								<FavoriteBorderIcon className={classes.icon} />{' '}
								<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>Favourite</span>
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/settings'>
							<SettingsIcon className={classes.icon} />{' '}
							<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>Settings</span>
						</NavLink>
					</div>
				</div>
			</nav>
			{!hiddenNav && <Backdrop onHideNav={() => setHiddenNav(true)} />}
		</>
	)
}
