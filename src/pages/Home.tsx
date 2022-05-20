import { useState } from 'react'
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';

const Home = () => {

    const [userLogged, setUserLogged] = useState<boolean>(false);

    if (!userLogged) {
        {/* If NOT logged in  */ }
        return (
            <div className="app" >
                <div>
                    <Header />
                    <div>

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

                    </div>
                </div>
                <Footer />
            </div >
        )
    }

}

export default Home