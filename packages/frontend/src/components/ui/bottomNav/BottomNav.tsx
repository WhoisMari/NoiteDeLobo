import { NavLink } from 'react-router-dom'
import { tabs } from './utils/constants'
import { useNarratorStore } from '../../../store/narratorStore'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  const phase = useNarratorStore((s) => s.phase)
  const isGameActive = phase !== 'idle'
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''} ${isGameActive && tab.to !== '/narrator' ? styles.linkDisabled : ''}`
            }
            onClick={(e) => {
              if (isGameActive && tab.to !== '/narrator') {
                e.preventDefault()
              }
            }}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className={styles.activeBar} />}
                <span className={styles.icon}>{tab.icon}</span>
                {tab.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
