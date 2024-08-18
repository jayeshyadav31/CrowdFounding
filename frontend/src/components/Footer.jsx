import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-4">Crowdfunding Inc.</h2>
                        <p className="text-gray-400">
                            Empowering communities to bring their projects to life through the power of crowdfunding.
                        </p>
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2"><a href="/about">About Us</a></li>
                            <li className="mb-2"><a href="/campaigns">Browse Campaigns</a></li>
                            <li className="mb-2"><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-400 mb-4">123 Crowdfunding Lane, Startup City, 56789</p>
                        <p className="text-gray-400 mb-4">Email: support@crowdfunding.com</p>
                        <p className="text-gray-400">Phone: +123 456 7890</p>
                        <div className="flex mt-4">
                            <a href="#" className="mr-4 text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="mr-4 text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="mr-4 text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Crowdfunding Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
