import { useEffect, useState } from 'react'
import { postsPerPageOptions } from '../../data/pagination.js'
import LeftArrow from '../../assets/LeftArrow.jsx'
import RightArrow from '../../assets/RightArrow.jsx'
import SelectBox from '../selectBox/SelectBox.jsx'
import './Pagination.css'

export default function Pagination({ length, currentPage, setCurrentPage, postsPerPage, setPostsPerPage }) {
    const [paginationNumbers, setPaginationNumbers] = useState([])
    const [postsPerPageOption, setPostsPerPageOption] = useState('10 / Page')

    useEffect(() => {
        const postsPerPageValue = +postsPerPageOption.split('/')[0]
        setPostsPerPage(postsPerPageValue)
    }, [postsPerPageOption])

    useEffect(() => {
        const tempPaginationNumbers = []
        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            tempPaginationNumbers.push(i)
        }
        setPaginationNumbers(tempPaginationNumbers)
    }, [postsPerPage, length])

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handlePrevious = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    return (
        <div className="pagination">
            {paginationNumbers.length ? (
                <>
                    <LeftArrow
                        fillColor={currentPage === 1 ? '#ccc' : '#000'}
                        disabled={currentPage === 1}
                        handleClick={handlePrevious}
                    />
                    <div className="buttons">
                        {paginationNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={pageNumber === currentPage ? 'active' : ''}
                                onClick={() => handlePagination(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <RightArrow
                        fillColor={currentPage === paginationNumbers.length ? '#ccc' : '#000'}
                        disabled={currentPage === paginationNumbers.length}
                        handleClick={handleNext}
                    />
                    <SelectBox
                        options={postsPerPageOptions}
                        position="top"
                        value={postsPerPageOption}
                        setValue={setPostsPerPageOption}
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
