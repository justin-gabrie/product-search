import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ProductTable from '../productTable/ProductTable'

export default function Grocery({ productTabOption, searchKeyword, category, includeOutOfStock }) {
    const [productData, setProductData] = useState([])
    const [totalDataLength, setTotalDataLength] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'default',
    })

    const prevPageRef = useRef(currentPage)

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const url = `http://localhost:3000/grocery?status=In Stock&_page=${currentPage}&_limit=${postsPerPage}`

            const { data, totalCount } = await fetchData(url)

            setTotalDataLength(totalCount)
            setProductData(data)
        }

        fetchDataAndUpdateState()
    }, [])

    useEffect(() => {
        const { statusParam, categoryParam, productOptionParam, sortParam, orderParam } = getQueryParams(
            includeOutOfStock,
            category,
            productTabOption,
            sortConfig
        )

        const pageToFetch = prevPageRef.current !== currentPage ? currentPage : 1

        const url = `http://localhost:3000/grocery?${statusParam}&${categoryParam}&${productOptionParam}&name_like=${searchKeyword}&_sort=${sortParam}&_order=${orderParam}&_page=${pageToFetch}&_limit=${postsPerPage}`

        const fetchDataAndUpdateState = async () => {
            const { data, totalCount } = await fetchData(url)
            setTotalDataLength(totalCount)
            setProductData(data)
        }

        fetchDataAndUpdateState()

        if (prevPageRef.current === currentPage) {
            setCurrentPage(1)
        }

        prevPageRef.current = currentPage
    }, [includeOutOfStock, category, productTabOption, searchKeyword, currentPage, postsPerPage, sortConfig])

    return (
        <ProductTable
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            totalDataLength={totalDataLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayedProducts={productData}
            postsPerPage={postsPerPage}
            setPostsPerPage={setPostsPerPage}
        />
    )
}

const getQueryParams = (includeOutOfStock, category, productTabOption, sortConfig) => {
    const statusParam = includeOutOfStock ? '' : 'status=In Stock'
    const categoryParam = category === 'All' ? '' : `category=${category}`
    const productOptionParam =
        productTabOption === 'Top Selling'
            ? 'topSelling=true'
            : productTabOption === 'Top Rated'
              ? 'rating_gte=4.6'
              : ''
    const sortParam = sortConfig?.direction === 'default' ? '' : sortConfig?.key
    const orderParam = sortConfig?.direction === 'default' ? '' : sortConfig?.direction

    return { statusParam, categoryParam, productOptionParam, sortParam, orderParam }
}

const fetchData = async (url) => {
    try {
        const response = await axios.get(url)
        const totalCount = response.headers['x-total-count']
        const data = response.data
        return { data, totalCount }
    } catch (error) {
        console.error('Error in fetching data: ', error)
    }
}
