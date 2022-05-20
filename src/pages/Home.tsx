import { useState } from 'react'
import Guest from '../components/home/Guest';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import LoggedIn from '../components/home/LoggedIn';

const Home = () => {
    const [userLogged, setUserLogged] = useState<boolean>(true);

    if (!userLogged) {
        {/* If NOT logged in  */ }
        return (
            <div className="app" >
                <div>
                    <Header />
                    <div>
                        <Guest />
                    </div>
                </div>
                <Footer />
            </div >
        )
    } else {
        {/* If logged in  */ }
        return (
            <div className="app" >
                <div>
                    <Header />
                    <div>
                        <LoggedIn />
                    </div>
                </div>
                <Footer />
            </div >
        )
    }

}

export default Home