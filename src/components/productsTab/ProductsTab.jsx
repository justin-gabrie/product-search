import { productTabs } from '../../data/tabs'
import './ProductsTab.css'

export default function ProductsTab({ productTabOption, setProductTabOption }) {
    const handleProductTabOption = (value) => {
        setProductTabOption(value)
    }

    return (
        <div className="products-tab">
            {productTabs.map((tab) => (
                <p
                    key={tab}
                    className={productTabOption === tab ? 'active-tab' : 'in-active-tab'}
                    onClick={() => handleProductTabOption(tab)}
                >
                    {tab}
                </p>
            ))}
        </div>
    )
}
