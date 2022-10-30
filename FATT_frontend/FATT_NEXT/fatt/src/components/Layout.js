import styles from '../../styles/Layout.module.css';
import stylesHeader from '../../styles/Header.module.css';
import HeadComponent from "./HeadComponent";
import Header from "./Header";
import Footer from "./Footer";
import MenuNav from './Menu';
import RightNav from './Right';

const Layout = ({children}) => {
  return (
    <>
    <div className={styles.gridContainer}> 

      <HeadComponent title={'FATT'} />
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.nav}>
        <MenuNav />
      </div>
      <div className={styles.main}>
      <main >
        <h1>FATT</h1>
        <p>dsadsafsadfsadsa</p>
        {children}
      </main>
      </div>
      <div className={styles.right}>
        <RightNav></RightNav>
      </div>

      <div className={styles.Footer}>
        <Footer /> 
      </div>
     </div>
    </>
  )
}


// const Layout = ({children}) => {
//   return (
//     <>
//     <div className={styles.gridContainer}> 

//       <HeadComponent title={'FATT'} />
//         <Header />


//         <MenuNav />


//       <main >
//         <h1>FATT</h1>
//         <p>dsadsafsadfsadsa</p>
//         {children}
//       </main>

//         <RightNav/>

//         <Footer /> 

//      </div>
//     </>
//   )
// }

export default Layout;



