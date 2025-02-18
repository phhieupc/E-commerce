import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb/Breadcrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

function Product() {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    if (!product) {
        return <div>Product not found</div>; // or display a 404 page
    }

    return (
        <div>
            <Breadcrumb product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts product={product} />
        </div>
    );
}

export default Product;
