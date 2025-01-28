import { Divider } from "@mantine/core";
import { IconHelmet, IconHome } from "@tabler/icons-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarNavigation.module.css";

const SidebarNavigation = memo(function SidebarNavigation() {
	return (
		<section className={styles.navigationItems}>
			<NavLink
				to={"/"}
				className={({ isActive }) =>
					`${styles.navigationItem} ${isActive ? styles.active : ""}`
				}
			>
				<IconHome />
				<span>Home</span>
			</NavLink>

			<Divider />

			<NavLink
				to={"/champions"}
				className={({ isActive }) =>
					`${styles.navigationItem} ${isActive ? styles.active : ""}`
				}
			>
				<IconHelmet />
				<span>Champions</span>
			</NavLink>
		</section>
	);
});

export default SidebarNavigation;
