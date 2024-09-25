import { useEffect, useState } from 'react'
import { products } from '../../data/products'
import ProductTable from '../productTable/ProductTable'

export default function Electronics({ productTabOption, searchKeyword, category, includeOutOfStock }) {
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'default',
    })
    const [statusFilteredProducts, setStatusFilteredProducts] = useState([])
    const [unsortedProducts, setUnsortedProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [displayedProducts, setDisplayedProducts] = useState([])

    useEffect(() => {
        setStatusFilteredProducts(
            includeOutOfStock ? products : products.filter((product) => product.status === 'In Stock')
        )
    }, [includeOutOfStock])

    useEffect(() => {
        const categoryProduct =
            category === 'All'
                ? statusFilteredProducts
                : statusFilteredProducts.filter((product) => product.category === category)

        const filteredProducts =
            productTabOption === 'All Products'
                ? categoryProduct
                : productTabOption === 'Top Selling'
                  ? categoryProduct.filter((product) => product.topSelling)
                  : categoryProduct.filter((product) => product.rating > 4.5)

        setUnsortedProducts(
            searchKeyword
                ? filteredProducts.filter((product) => product.name.toLowerCase().includes(searchKeyword))
                : filteredProducts
        )

        setSortConfig({ key: '', direction: 'default' })
        setCurrentPage(1)
    }, [statusFilteredProducts, productTabOption, searchKeyword, category])

    useEffect(() => {
        setSortedProducts(
            sortConfig.direction === 'default'
                ? [...unsortedProducts]
                : [...unsortedProducts].sort((a, b) => sortProduct(a, b))
        )
    }, [sortConfig, unsortedProducts])

    useEffect(() => {
        if (currentPage > 1) {
            setDisplayedProducts(
                sortedProducts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            )
        } else {
            setDisplayedProducts(sortedProducts.slice(currentPage - 1, currentPage * postsPerPage))
        }
    }, [currentPage, sortedProducts, postsPerPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [postsPerPage])

    const sortProduct = (firstItem, secondItem) => {
        const modifiedFirstItem =
            sortConfig.key === 'name' ? firstItem[sortConfig.key].toLowerCase() : firstItem[sortConfig.key]
        const modifiedSecondItem =
            sortConfig.key === 'name' ? secondItem[sortConfig.key].toLowerCase() : secondItem[sortConfig.key]
        if (modifiedFirstItem < modifiedSecondItem) {
            return sortConfig.direction === 'asc' ? -1 : 1
        } else if (modifiedFirstItem > modifiedSecondItem) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    }

    return (
        <ProductTable
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            totalDataLength={sortedProducts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayedProducts={displayedProducts}
            postsPerPage={postsPerPage}
            setPostsPerPage={setPostsPerPage}
        />
    )
}
