import type { NextPage } from "next"
import Image from "next/image"
import test from "../assets/test.jpg"
const Home: NextPage = () => {
  return (
    <div className="continer">
      <nav className="nav">
        {" "}
        <div>image</div>
        <h4>welcome</h4>
      </nav>
      <div className="login"></div>
      <div className="hero">
        <Image className="image" src={test} layout="fill" />
      </div>
    </div>
  )
}

export default Home
