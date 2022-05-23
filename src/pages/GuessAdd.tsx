import GuessAddForm from "../components/forms/GuessAddForm"
import Footer from "../components/layouts/footer/Footer"
import Header from "../components/layouts/header/Header"

const GuessAdd = () => {

    return (
        <div className="app" >
            <div>
                <Header />
                <div>
                    <GuessAddForm />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default GuessAdd