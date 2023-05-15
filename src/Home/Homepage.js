import { Link } from 'react-router-dom'
import '../App.css'

function Homepage() {
    return (

        <body>

            <div class="container">
                {/* <!-- Front Page --> */}
                <div class="front-page">

                    {/*  <!-- Section 2 --> */}
                    <section class="section-2">
                        <h1 class="section-2-heading">Welcome</h1>
                        
                        <p class="service-paragraph">Empowering Generosity, One Crypto at a Time!</p>
                        <div class="services">

                            <div class="service">
                                <p class="service-paragraph">Confidentiality, Integrity, and Availability</p>
                            </div>
                        </div>
                    </section>
                    {/*   <!-- End of Section 2 --> */}

                    {/*  <!-- Section 5 --> */}
                    <section class="section-5">
                        <div class="section-5-top">
                            <h2 class="section-5-top-heading">Sign Up and Get Started</h2>
                            <Link to={"/blockview"}>
                                <button class="blue-btn signup">Get Started</button>
                            </Link>

                        </div>
                        <footer class="footer">

                            <div class="footer-bottom">
                                <p class="copyright">Copyright &copy; All Rights Reserved</p>
                            </div>
                        </footer>
                    </section>
                    {/* <!-- End of Section 5 --> */}
                </div>
            </div>
        </body>

    )
}

export default Homepage;