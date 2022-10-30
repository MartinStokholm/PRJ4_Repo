import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>
            <img src="/fatt-logo.png" alt="logo" className={navStyles.logo} />
          </Link>
        </li>
        <li>
          <Link href='/account'>Account</Link>
        </li>
        <li>
          <Link href='/workouts'>Workouts</Link>
        </li>
        <li>
          <Link href='/exercises'>Exercises</Link>
        </li>
        <li>
          <Link href='/meals'>Meals</Link>
        </li>
        <li>
          <Link href='/dishes'>Dishes</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav