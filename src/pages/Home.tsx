import { useEffect, useState } from 'react'
import Guest from '../components/home/Guest';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import LoggedIn from '../components/home/LoggedIn';
import { MostRecentLocationsHome, UserState } from '../utils/common/RecoilStates';
import User from '../utils/types/User';
import { useRecoilState } from 'recoil'
import axios from 'axios';
import Location from '../utils/types/Location';

const Home = () => {

    //Getting and saving the user to a global state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    useEffect(() => {
    }, [loggedUser])

    if (loggedUser.userId !== 0) {
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
    } else if (loggedUser.userId === 0) {
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
        return <div> Loading </div>
    }

}

export default Home
