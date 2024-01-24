import React, {useEffect} from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const microsoft = require('./Images/microsoft.png')
const disnep = require('./Images/disnep.png')
const amazon = require('./Images/amazon.png')
const netflix = require('./Images/netflix.png')
const adobe = require('./Images/adobe.png')
const salesforce = require('./Images/salesforce.png')
const background = require('./Images/background.png')
const bvideo = require('./Images/bvideo.webm')
const screen = require('./Images/screen1.png')
// const picture1 = require('./Images/download.jpeg')
const features = require('./Images/features.png')
const template = require('./Images/templates.png')
const productivity = require('./Images/productivity.png')
const extension = require('./Images/extension.png')
const inspiration = require('./Images/inspiration.png')
const main = require('./Images/favicon.ico')
const task = require('./Images/task.png')
const people = require('./Images/people.png')
const zomato = require('./Images/zomato.png')
const rapid = require('./Images/rapid.png') 

const Home = () => {
    useEffect(() => {
        const change = () => {
            var scrollPosition = window.document.documentElement.scrollTop;
            const imgContent = document.querySelector('.img-content');
            const scr = document.querySelector('.hide-screen');
            if (scrollPosition > 300) {
                imgContent.style.display = 'block';
                scr.style.display = 'block';
            } 
            else {
                imgContent.style.display = 'none';
                scr.style.display = 'none';
            }
        };

        // Attach the scroll event listener to the window
        window.addEventListener('scroll', change);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', change);
        };
    });

    return (
        <div>
            <Navbar/>
            <main>
                <div className="text">
                    <div className="basic">Organize your work<br /> and life finally.</div>
                    <div className="second">Become focused, organized, and calm with Task Manager. The world's #1<br /> task manager and to-do list app.</div>
                    <Link to = '/signUp'><div className="button">Start for Free</div></Link>
                </div>
                <div className="background-content">
                    <video src={bvideo} alt="video-preview" autoPlay loop muted/>
                    <img className="img-content" src={background} alt="app-preview" />
                    <img className="hide-screen" src={screen} alt="screen" />
                </div>
                <div className="icons">
                    <div className="icons-text">30 million+ people and teams trust their sanity and productivity to Task Manager</div>
                    <div className="icons-list">
                        <img src={microsoft} alt="microsoft" />
                        <img src={disnep} alt="disnep" />
                        <img src={amazon} alt="amazon" />
                        <img src={netflix} alt="netflix" />
                        <img src={adobe} alt="adobe" />
                        <img src={salesforce} alt="salesforce" />
                    </div>
                </div>
                {/* <div className="text-video">
                    <div className="part1">
                        <div className="red-small">Clear your mind.</div>
                        <b className="heading">The fastest way to get<br/> tasks out of your head.</b>
                        <p className="para">Type just about anything into the task field and<br/> Task Manager's one-of-its-kind natural language<br/> recognition will instantly fill your to-do list.</p>
                        <div className="red-small">Focus on what's important</div>
                        <b className="heading">Reach that mental clarity you've been longing for.</b>
                        <p className="para">Your tasks are automatically sorted into Today, Upcoming, and custom Filter views to help you prioritize your most important work.
                        </p>
                        <div className="red-small">Organize your teamwork, too</div>
                        <b className="heading">Where all your tasks can finally coexist.</b>
                        <p className="para">Give your team a shared space to collaborate and stay on top of it all - alongside but separate from your personal tasks and projects.</p>
                    </div>
                    <div className="part2">
                        <img src = {picture1} alt = "preview"/>
                    </div>
                </div> */}
                <div className = "secondMiddle">
                    <p>"Task Manager makes it easy to<br/> go as simple or as complex as you want"</p>
                    <span>-The Verge</span>
                </div>
                <div className = "offer-gallery">
                    <p className = "heading"><b>Explore all Task Manager has to offer</b></p>
                    <div className = "cards">
                        <div className = "card">
                            <Link to='/'><img src = {features} alt = "features"/></Link>
                            <p>Features</p>
                        </div>
                        <div className = "card">
                            <Link to='/'><img src = {template} alt = "template-gallery"/></Link>
                            <p>Template-Gallery</p>
                        </div>
                        <div className = "card">
                            <Link to='/'><img src = {productivity} alt = "productivity"/></Link>
                            <p>Productivity</p>
                        </div>
                        <div className = "card">
                            <Link to='/'><img src = {extension} alt = "extension"/></Link>
                            <p>Extensions</p>
                        </div>
                        <div className = "card">
                            <Link to='/'><img src = {inspiration} alt = "inspiration"/></Link>
                            <p>Inspiration</p>
                        </div>
                    </div>
                </div>
                <div className = "text-with-video">
                    <div className = "left">
                        <p>In it for the long haul</p>
                        <p>A task manager you can trust for life</p>
                        <p>We've been building Task Manager for the future carrying the present. Rest assured that we'll never sell out to the highest bidder.</p>
                        <p><i className = "fa-solid fa-book-open"></i> Read about our long term mission</p>
                    </div>
                    <div className = "right">
                        <div className = "automatic-slider">
                            <div className = "images">
                                <img src = {task} alt = "text" height = "200px" width = "250px"/><br/>
                                <b>2 billion+</b> <br/>tasks completed
                            </div>
                            <div className = "images">
                                <img src = {zomato} alt = "zomato" height = "200px" width = "250px"/><br/>
                                <b>160 million+</b><br/>downloads
                            </div>
                            <div className = "images">
                                <img src = {people} alt = "people" height = "200px" width = "250px"/><br/>
                                <b>1 million+</b><br/> pro users
                            </div>
                            <div className = "images">
                                <img src = {rapid} alt = "rapido" height = "200px" width = "250px"/><br/>
                                <b>30+ million</b><br/> downloads
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className = "footer-heading">
                    <p id = "one">Gain calmness and clarity with the<br/> world's most beloved productivity app</p>
                    <p id = "two">337,000+ ★★★★★ reviews on Google Play and App Store</p>
                    <div className="button">Start for Free</div>
                    <div className = "download">
                        <i className="fa-solid fa-download"></i> 
                        <span> Download apps</span>
                    </div>
                </div>
                <hr/>
                <div className = "footer-trailer">
                    <div className = "ft-top">
                        <div className = "ft-top-left">
                            <div className = "small-heading">
                                <img src = {main} alt = "main" width = "40px" height = "40px"/>
                                <span>Task Manager</span>
                            </div>
                            <div className='small-description'>Join millions of people who organize<br/> work and life with Task Manger.</div>
                        </div>
                        <div className = "ft-top-right">
                            <div id = "rfirst">
                                <ul>
                                    <li>Features</li>
                                    <li className = "selectli">How it Works</li>
                                    <li className = "selectli">Pricing</li>
                                    <li className = "selectli">Template</li>
                                    <li className = "selectli">For Teams</li>
                                </ul>
                            </div>
                            <div id = "rsecond">
                                <ul>
                                    <li>Resources</li>
                                    <li className = "selectli">Download Apps</li>
                                    <li className = "selectli">Help Center</li>
                                    <li className = "selectli">Productivity Methods</li>
                                    <li className = "selectli">Channel Partner</li>
                                    <li className = "selectli">Developer API</li>
                                    <li className = "selectli">Status</li>
                                </ul>
                            </div>
                            <div id = "rthird">
                                <ul>
                                    <li>Company</li>
                                    <li className = "selectli">About Us</li>
                                    <li className = "selectli">Carriers</li>
                                    <li className = "selectli">Inspiration Hub</li>
                                    <li className = "selectli">Press</li>
                                    <li className = "selectli">Twist</li>
                                </ul>
                            </div>
                            <div id = "rfourth">
                                <ul>
                                    <li className = "selectli"><i className="fa-brands fa-twitter"></i></li>
                                    <li className = "selectli"><i className="fa-brands fa-youtube"></i></li>
                                    <li className = "selectli"><i className="fa-brands fa-facebook-f"></i></li>
                                    <li className = "selectli">
                                        <a href = "https://www.instagram.com/s_18singh/">
                                        <i className="fa-brands fa-instagram"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className = "ft-bottom">
                        <span className = "low-left">Security | Privacy | Terms © Doist Inc. </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
