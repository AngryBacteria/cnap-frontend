import { Divider } from "@mantine/core";
import { IconHelmet, IconHome } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import styles from "./SidebarNavigation.module.css";

export function SidebarNavigation() {
	return (
		<section className={styles.navigationItems}>
			<Link to={"/"} className={styles.navigationItem}>
				<IconHome />
				<span>Home</span>
			</Link>

			<Divider />

			<Link to={"/champions"} className={styles.navigationItem}>
				<IconHelmet />
				<span>Champions</span>
			</Link>
		</section>
	);
}
