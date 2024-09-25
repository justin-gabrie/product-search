import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProductHeader from '../productHeader/ProductHeader'
import ProductsTab from '../productsTab/ProductsTab'
import ToggleButton from '../toggleButton/ToggleButton'

export default function ProductDisplay({
    productTabOption,
    setProductTabOption,
    includeOutOfStock,
    setIncludeOutOfStock,
    setSearchKeyword,
    category,
    setCategory,
    children,
}) {
    const location = useLocation()

    useEffect(() => {
        setCategory('All')
    }, [location.pathname])

    return (
        <div className="product-container">
            <ProductHeader
                category={category}
                setCategory={setCategory}
                pathname={location.pathname}
                setSearchKeyword={setSearchKeyword}
            />
            <ProductsTab productTabOption={productTabOption} setProductTabOption={setProductTabOption} />
            <ToggleButton isToggled={includeOutOfStock} setIsToggled={setIncludeOutOfStock} />
            {children}
        </div>
    )
}
