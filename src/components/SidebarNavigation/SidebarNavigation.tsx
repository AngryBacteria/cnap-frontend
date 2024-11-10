import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IconHelmet, IconHome } from '@tabler/icons-react';
import styles from './SidebarNavigation.module.css';
import { Divider } from '@mantine/core';

const SidebarNavigation = memo(function SidebarNavigation() {
  return (
    <section className={styles.navigationItems}>
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          `${styles.navigationItem} ${isActive ? styles.active : ''}`
        }
      >
        <IconHome />
        <span>Home</span>
      </NavLink>

      <Divider />

      <NavLink
        to={'/champions'}
        className={({ isActive }) =>
          `${styles.navigationItem} ${isActive ? styles.active : ''}`
        }
      >
        <IconHelmet />
        <span>Champions</span>
      </NavLink>
    </section>
  );
});

export default SidebarNavigation;
