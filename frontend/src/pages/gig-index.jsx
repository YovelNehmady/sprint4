import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { GigList } from "../cmps/gig-list"
import { gigService } from "../services/gig.service"
import { loadGigs } from "../store/gig/gig.action"
import { store } from "../store/gig/store"

export function GigIndex() {
    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    // const [mostPopularGigs, setMostPopularGigs] = useState(null)

    // DONE: create gigs on local storage
    // DONE: get (query) the gigs (load gigs)
    // DONE: render list
    // DONE: render preview
    // DONE: pixel prefect gig
    // DONE: line length
    // TODO: create cards slider
    // TODO: sort by popularity

    useEffect(() => {
        // lala()
        loadGigs(filterBy)
        // setTimeout(()=>{
        // setMostPopularGigs(gigService.getPopulatGigs(gigs))
        // console.log('gigs:', gigs)
        // console.log('mostPopularGigs:', mostPopularGigs)
        // },2000)
    }, [filterBy])

    // async function lala() {
    //     try {
    //         await loadGigs(filterBy)
    //         setMostPopularGigs(gigService.getPopulatGigs(gigs))
    //     } catch (err) {
    //         console.log('ERROR', err)
    //         throw err
    //     }
    // }

    // items.sort((a, b) => {
    //     const nameA = a.name
    //     const nameB = b.name
    //     if (nameA < nameB) return -1
    //     if (nameA > nameB) return 1
    //     return 0
    // })


    return (
        <section className="gig-index">
            <h1>test: txt - {filterBy.txt}, label - {filterBy.label}</h1>
            <div className="main-layout">
                {/* <div className="sort-by-popular">
                <GigList mostPopularGigs={mostPopularGigs} />
            </div> */}

                <GigList gigs={gigs} />
            </div>
        </section>
    )
}