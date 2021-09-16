import Link from "next/link";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a href="">
            <h1>
              <span>Just Add</span>
              <span>Marmite</span>
            </h1>
            <h2>Spread the Joy</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2021 Just Add Marmite :)</p>
      </footer>
    </div>
  );
};

export default MainLayout;
