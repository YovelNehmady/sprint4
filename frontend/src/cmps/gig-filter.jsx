//TODO Adjust to our needs
//TODO create filter template in service

import { useEffect, useState } from "react"

import { gigService } from "../services/gig.service.js"
import { setfilter } from "../store/gig/gig.action.js"
import { useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { Fragment } from "react"
import { useSelector } from "react-redux"


export function GigFilter({ suggestShown = true, searchBtnContent, placeholderTxt }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)
    const changeScroll = () => {
        if (window.scrollY > 100) setScroll(true)
        else setScroll(false)
    }
    window.addEventListener('scroll', changeScroll)

    useEffect(() => {
        if (!filterByToEdit.tags) return
        setfilter(filterByToEdit)
        navigate('/gig')
    }, [filterByToEdit])


    function onChange({ target }) {
        const { name: field, value } = target
        setFilterByToEdit((prev) => { return { ...prev, [field]: value } })
    }

    function onClickSuggest(value) {
        setFilterByToEdit((prev) => { return { ...prev, tags: value, txt: '' } })
        console.log("onclick ", filterByToEdit)
        setfilter(filterByToEdit)
        navigate('/gig')
    }

    function onFilterSubmit(ev) {
        ev?.preventDefault()
        setfilter(filterByToEdit)
        //TODO add only if user loged in
        navigate('/gig')
        // setFilterByToEdit(gigService.getDefaultFilter())
    }

    return  <>
        {/* <SearchBar onChange ={onChange} onFilterSubmit={onFilterSubmit} filterByToEdit={filterByToEdit}/> */}
        <form className={(!scroll && window.location.hash === '#/') ? 'filter-form before-scroll-hide' : 'filter-form'} onSubmit={onFilterSubmit}>
            <input
                className="search-bar"
                type="text"
                id="txt"
                name="txt"
                placeholder= {placeholderTxt}
                value={filterByToEdit.txt}
                onChange={onChange}
            />
            <button className="search-bar-btn">{searchBtnContent}</button>
        </form>
        </>
}