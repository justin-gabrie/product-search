import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import ProductDisplay from './components/ProductDisplay/ProductDisplay'
import Electronics from './components/electronics/Electronics'
import Grocery from './components/grocery/Grocery'
import './App.css'

function App() {
    const [productTabOption, setProductTabOption] = useState('All Products')
    const [includeOutOfStock, setIncludeOutOfStock] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [category, setCategory] = useState('All')

    const renderProductDisplay = (Component) => (
        <ProductDisplay
            productTabOption={productTabOption}
            setProductTabOption={setProductTabOption}
            includeOutOfStock={includeOutOfStock}
            setIncludeOutOfStock={setIncludeOutOfStock}
            setSearchKeyword={setSearchKeyword}
            category={category}
            setCategory={setCategory}
        >
            <Component
                productTabOption={productTabOption}
                searchKeyword={searchKeyword}
                category={category}
                includeOutOfStock={includeOutOfStock}
            />
        </ProductDisplay>
    )

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="electronics" />} />
                <Route path="/electronics" element={renderProductDisplay(Electronics)} />
                <Route path="/grocery" element={renderProductDisplay(Grocery)} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
