/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import styles from "../../styles/navbar.module.scss";
import Flame from "../../assets/flame.svg";
import Image from "next/image";
import { Home, Search } from "react-feather";
import LoginButtons from "../loginButtons/Index";
import { useEffect, useState } from "react";

function Index() {
  const store = useSelector((store: any) => store.authUser);

  return (
    <nav className={styles.navBar}>
      <div>
        <div>search</div>
      </div>
      <ul className={styles.navlist}>
        <li>
          <a href="#">
            <Home size={30} />
          </a>
        </li>
        <li className="flame">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/52/Octicons-flame.svg"
              height={30}
              width={30}
              alt="flame"
            ></img>
          </a>
        </li>
        <li>
          <a href="#">
            <Search size={30} />
          </a>
        </li>
      </ul>
      <div className={styles.rightSide}>
        {store.isloggedin ? (
          <div>
            <img
              src={ store.user.imgurl}
              width={20}
              alt=""
            />
          </div>
        ) : (
          <LoginButtons />
        )}
      </div>
    </nav>
  );
}

export default Index;
