import { useEffect, useState } from 'react'
import Guest from '../components/home/Guest';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import LoggedIn from '../components/home/LoggedIn';
import { UserState } from '../utils/common/UserRecoil';
import User from '../utils/types/User';
import { useRecoilState } from 'recoil'
import axios from 'axios';

const Home = () => {

    //Getting and saving the user to a global state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    useEffect(() => {
        //Get the user
        const fetchLoggedUser = async () => {
            await axios(
                {
                    method: 'POST',
                    url: 'http://localhost:3333/auth/user',
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            ).then(response => {
                setLoggedUser(response.data);
            }).catch(error => {
                console.log('Signup error: ', error)
            });
        }
        fetchLoggedUser();
    }, [])

    useEffect(() => {
        console.log(loggedUser.s3Imagekey);
    }, [loggedUser])

    if (loggedUser) {
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
    } else if (!loggedUser) {
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
