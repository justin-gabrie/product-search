import Pagination from '../pagination/Pagination'
import ratingIcon from '../../assets/rating.png'
import sortUp from '../../assets/sort-up.png'
import sortDown from '../../assets/sort-down.png'
import sortDefault from '../../assets/sort-default.png'
import './ProductTable.css'

export default function ProductTable({
    sortConfig,
    setSortConfig,
    totalDataLength,
    currentPage,
    setCurrentPage,
    displayedProducts,
    postsPerPage,
    setPostsPerPage,
}) {
    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction:
                prevConfig.direction === 'default'
                    ? 'asc'
                    : prevConfig.direction === 'asc'
                      ? 'desc'
                      : 'default',
        }))
        setCurrentPage(1)
    }

    return (
        <div className="product-table">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            <div className="sort-wrapper">
                                NAME
                                {getSortIcon('name', sortConfig)}
                            </div>
                        </th>
                        <th onClick={() => handleSort('price')}>
                            <div className="sort-wrapper">
                                PRICE
                                {getSortIcon('price', sortConfig)}
                            </div>
                        </th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>RATING</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map(({ id, name, category, status, price, rating }) => (
                            <tr key={id}>
                                <td className="product-name">{name}</td>
                                <td>${price}</td>
                                <td>{category}</td>
                                <td className={status === 'In Stock' ? 'available' : 'not-available'}>
                                    <span>{status}</span>
                                </td>
                                <td>
                                    <div className="rating-container">
                                        {rating}
                                        <img src={ratingIcon} alt="rating" height="20px" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="no-data">No products found</tr>
                    )}
                </tbody>
            </table>
            <Pagination
                length={totalDataLength}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
                setPostsPerPage={setPostsPerPage}
            />
        </div>
    )
}

const getSortIcon = (key, sortConfig) => {
    if (sortConfig.key === key) {
        if (sortConfig.direction === 'asc') {
            return <img src={sortUp} alt="sortUp" height="18px" />
        } else if (sortConfig.direction === 'desc') {
            return <img src={sortDown} alt="sortDown" height="18px" />
        }
    }
    return <img src={sortDefault} alt="default" height="18px" />
}
