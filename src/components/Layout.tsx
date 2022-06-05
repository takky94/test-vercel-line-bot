import styles from "../styles/components/Layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.wrap}>{children}</div>
);

export default Layout;
