import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { ChangePasswordForm } from './ChangePasswordForm'
import { EditProfileForm } from './EditProfileForm'
import classes from './TabPanel.module.scss'

export const TabPanel = () => {
	const [value, setValue] = useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	interface TabPanelProps {
		children?: React.ReactNode
		index: number
		value: number
	}

	const TabPanel = (props: TabPanelProps) => {
		const { children, value, index, ...other } = props

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}>
				{value === index && <Box sx={{ marginTop: '2rem' }}>{children}</Box>}
			</div>
		)
	}

	const a11yProps = (index: number) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		}
	}

	return (
		<div className={classes.tabPanelWrapper}>
			<Tabs className={classes.tabPanelWrapper} value={value} onChange={handleChange} aria-label='basic tabs example'>
				<Tab disableRipple sx={{ color: 'var(--white-color)' }} label='Change password' {...a11yProps(0)} />
				<Tab disableRipple sx={{ color: 'var(--white-color)' }} label='Edit user profile' {...a11yProps(1)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<ChangePasswordForm />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<EditProfileForm />
			</TabPanel>
		</div>
	)
}
