import React from 'react'

import '../../styles/component/footer.scss'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="main-content pb-4 px-4">
                    <div className="left box">
                        <div className="border-b-4 border-white pb-2 text-xl">ABOUT US</div>
                        <div className="content">
                            <p>
                                Laundry Near Me is a full-service business that caters to those who need a Jakarta laundry service nearby,
                                including a wash-dry-fold option, ironing and more. We also do curtains, leather, suede, suits, dry cleaning, and
                                wedding gown cleaning and restoration.
                            </p>
                        </div>
                    </div>

                    <div className="center box">
                        <div className="border-b-4 border-white pb-2 text-xl">ADDRESS</div>
                        <div className="content">
                            <div>
                                <span className="text">Jakarta, Indonesia</span>
                            </div>
                            <div className="phone">
                                <span className="text">+62 8900 9000</span>
                            </div>
                            <div>
                                <span className="text">laundry@money.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="right box">
                        <div className="border-b-4 border-white pb-2 text-xl">CONTACT US</div>
                        <div className="content">
                            <form>
                                <div>
                                    <div className="text">Email *</div>
                                    <input type="email" required />
                                </div>
                                <div className="msg">
                                    <div className="text">Message *</div>
                                    <textarea rows="2" cols="25" required></textarea>
                                </div>
                                <div className="btn">
                                    <button className="polygon-custom" type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <center>
                        <span>Created By <a href="#">Moneylaundry</a> | </span>
                        <span> 2025 All rights reserved.</span>
                    </center>
                </div>
            </footer>
        </>
    )
}

export default Footer