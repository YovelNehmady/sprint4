import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from "react-router-dom"

import { LoginSignUp } from './user/login-signup'
import { CategoryNav } from './category-nav-bar'
import { GigFilter } from './gig-filter'

import { eventBus, JOIN_USER } from '../services/event-bus.service.js'

import { AiOutlineSearch } from "react-icons/ai"
import { BiEnvelope } from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa"
import { RiNotification3Line } from "react-icons/ri"

export function AppHeader({ elApp }) {
    const { loggedinUser } = useSelector((storeState) => storeState.userModule)
    const [openModal, setOpenModal] = useState(null)
    const [stickyClassname, setStickyClassname] = useState('')
    const [homeClassname, setHomeClassname] = useState('')
    const elHeader = useRef(null)
    let location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") setHomeClassname('home')
        else setHomeClassname('')
    }, [location])

    useEffect(() => {
        const headerObserver = new IntersectionObserver(onHeaderObserved, { rootMargin: "-91px 0px 0px" })
        headerObserver.observe(elHeader.current)
        function onHeaderObserved(entries) {
            entries.forEach((entry) => {
                console.log('changed',entry);
                if (entry.isIntersecting) setStickyClassname('')
                else setStickyClassname('sticky')
            })
        }
    }, [])

    useEffect(() => {
        eventBus.on(JOIN_USER, () => setOpenModal('login'))
    }, [])

    return (
        <header ref={elHeader} className={`app-header full ${stickyClassname} ${homeClassname} `}>
            <div className="main-layout">
                <div className="top-header">
                    <div className="logo-filter">
                        <NavLink to="/" className='logo'>undefinederr<span>.</span></NavLink>
                        <GigFilter searchBtnContent={<AiOutlineSearch />} placeholderTxt="What service are you looking for today?" />
                    </div>
                    {loggedinUser && <nav className="loggedin-nav">
                        <span className='icon' title="Notifications"><RiNotification3Line size="22px" /></span>
                        <span className='icon' title="Messages"><BiEnvelope size="22px" /></span>
                        <span className='icon' title="Lists"><FaRegHeart size="18px" /></span>
                        <p className='orders'>Orders</p>
                        <img className="user-img" src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg" />
                    </nav>}
                    {!loggedinUser && <nav className="main-nav">
                        <NavLink to="/gig" className='explore'>Explore</NavLink>
                        <button onClick={() => setOpenModal('login')} className='signin'>Sign in</button>
                        <button onClick={() => setOpenModal('signup')} className='join'>Join</button>
                    </nav>}
                </div>
            </div>
            <div className='bottom-header main-layout'>
                <CategoryNav />
            </div>
            {openModal && <LoginSignUp elApp={elApp} setOpenModal={setOpenModal} status={openModal} />}
        </header>
    )
}