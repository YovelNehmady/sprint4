
import { SlArrowRight } from "react-icons/sl"
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { gigService } from "../services/gig.service"
import { showErrorMsg } from "../services/event-bus.service"
import { DetailsSidebar } from "../cmps/details-sidebar"
import { OwnerRate } from "../cmps/owner-rate"
import { Reviews } from "../cmps/reviews"
import { OwnerProfile } from "../cmps/owner-profile"
import { FaHeart } from "react-icons/fa"

export function GigDetails() {
    const navigate = useNavigate()
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)

    const elOverview = useRef(null)
    const elDescription = useRef(null)
    const elAboutTheSeller = useRef(null)
    const elReviews = useRef(null)

    const elReviewNav = useRef(null)

    // useEffect(() => {
    //     if (!elReviews.current) return
    //     const headerObserver = new IntersectionObserver(onHeaderObserved, {
    //         //   rootMargin: "100px 0px 0px",
    //     });

    //     headerObserver.observe(elReviews.current)

    //     function onHeaderObserved(entries) {
    //         entries.forEach((entry) => {

    //             console.log('helllooo')
    //             // elReviewNav.classList.toggle('active') = entry.isIntersecting ? 'static' : 'fixed';
    //             if (entry.isIntersecting) elReviewNav.current.classList.toggle('active')

    //         })
    //     }
    // }, [elReviews.current])


    useEffect(() => {
        loadGig()
    }, [])

    async function loadGig() {
        try {
            const gig = await gigService.get(gigId)
            setGig(gig)
        } catch (err) {
            showErrorMsg('eror msg from details, need to thing about txt...')
            navigate('/gig')
        }
    }

    function scrollTo(element) {
        let elSection
        switch (element) {
            case 'overview':
                elSection = elOverview
                break
            case 'description':
                elSection = elDescription
                break
            case 'aboutTheSeller':
                elSection = elAboutTheSeller
                break
            case 'reviews':
                elSection = elReviews
                break
        }
        elSection.current.scrollIntoView({ behavior: "smooth" })
    }

    if (!gig) return <p>Loading...</p>

    return (
        <section className="gig-details ">
            <div className="details-nav main-layout full">
                <div className="flex space-between">

                    <ul className="flex">
                        <li onClick={() => scrollTo('overview')}>
                            Overview
                        </li>
                        <li onClick={() => scrollTo('description')}>
                            Description
                        </li>
                        <li onClick={() => scrollTo('aboutTheSeller')}>
                            About The Seller
                        </li >
                        {gig.reviews.length && <li ref={elReviewNav} onClick={() => scrollTo('reviews')}>
                            Reviews
                        </li>}
                    </ul>

                    <div className="wish-list flex align-center">
                        <button className="add-wishlist"> <FaHeart /> </button>
                        <span className="count-wishlist">14</span>
                    </div>
                </div>

            </div>
            <section className="gig-details-container flex">

                <div ref={elOverview} className="details-layout flex">

                    <section className="main">
                        <div className="breadcrumds flex align-center" >
                            <button className='open-btn category' >Category</button>
                            <SlArrowRight size="10px" />
                            <button className='open-btn subcategory' >Subcategory</button>
                        </div>
                        <h1>{gig.title}</h1>

                        <div className="mini-owner flex">
                            <img className="owner-img" src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg" />
                            <p className="owner-name">{gig.owner.fullname}</p>
                            <p className="owner-level">{gig.owner.level}</p>
                            <div className="owner-rate flex align-center"><OwnerRate rate={gig.owner.rate} /> </div>
                        </div>

                        <div className="img-container">
                            <img className="main-img" src={gig.imgUrl} />
                        </div>

                        {gig.reviews.length && <div className="reviews-snippet">
                            <header className="flex space-between">
                                <h2>What people loved about this seller</h2>
                                <button className='open-btn' onClick={() => scrollTo('reviews')}>See all reviews</button>
                            </header>
                            <div className="reviews-carousel">
                                {/* //TODO: reviews-carousel!!! */}
                            </div>

                        </div>}

                        <div ref={elDescription} className="about">

                            <h2>About This Gig</h2>
                            <p>{gig.description}</p>
                            <p>Please message me before ordering :)</p>
                            <p>As an experienced, published writer I have a real eye for words and grammar.</p>
                            <p>I will proofread, grammar check and edit your cover letter so that it is personal to you and the job you are applying for. It will make you stand out from the crowd and give you the best chance of getting an interview and landing your dream role!</p>
                            <p>I am also very flexible and understand the importance of deadlines. </p>
                        </div>

                        <span ref={elAboutTheSeller}><OwnerProfile gig={gig} /></span>
                        {gig.reviews.length && <span ref={elReviews}><Reviews gig={gig} /></span>}
                    </section>

                    <DetailsSidebar gig={gig} />
                </div>

            </section>
        </section>
    )
}