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
	const [hiddenNav, setHiddenNav] = useState<boolean>(false)
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
						<span>Notes</span> App
					</NavLink>

					<div className={classes.links}>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/create'>
							<AddIcon className={classes.icon} /> Create new
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/notes'>
							<Badge badgeContent={notes.length} color='primary'>
								<FormatListBulletedIcon className={classes.icon} />
								Notes
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/trash'>
							<Badge badgeContent={trashNotes.length} color='primary'>
								<DeleteOutlineIcon className={classes.icon} /> Trash
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/favourite'>
							<Badge badgeContent={null} color='primary'>
								<FavoriteBorderIcon className={classes.icon} /> Favourite
							</Badge>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to='/settings'>
							<SettingsIcon className={classes.icon} /> Settings
						</NavLink>
					</div>
				</div>
			</nav>
			{!hiddenNav && <Backdrop onHideNav={() => setHiddenNav(true)} />}
		</>
	)
}
