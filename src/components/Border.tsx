import Image from "next/image";
import styles from "../styles/components/Border.module.scss";

type Props = {
  isBottom?: boolean;
};

const Border: React.FC<Props> = ({ isBottom = false }) => (
  <div className={`${styles.wrap} ${isBottom && styles.bottom}`}>
    <Image
      className={styles.borderLeft}
      src="/liff/border.png"
      width={70}
      height={70}
    />
    <Image
      className={styles.borderRight}
      src="/liff/border.png"
      width={70}
      height={70}
    />
  </div>
);

export default Border;
