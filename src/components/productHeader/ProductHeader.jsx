import SelectBox from '../selectBox/SelectBox'
import { electronicsOptions, groceryOptions } from '../../data/categories'
import search from '../../assets/search.png'
import './ProductHeader.css'

export default function ProductHeader({ category, setCategory, pathname, setSearchKeyword }) {
    const handleSearch = (e) => {
        setSearchKeyword(e.target.value.toLowerCase())
    }

    return (
        <div className="product-header">
            <h2>Products</h2>
            <div className="controls-panel">
                <div className="search">
                    <img src={search} alt="search" height="20px" />
                    <input placeholder="Search" onChange={(e) => handleSearch(e)} />
                    <SelectBox
                        value={category}
                        setValue={setCategory}
                        options={pathname === '/electronics' ? electronicsOptions : groceryOptions}
                        position="bottom"
                        border={false}
                        placeholder="category"
                    />
                </div>
            </div>
        </div>
    )
}
