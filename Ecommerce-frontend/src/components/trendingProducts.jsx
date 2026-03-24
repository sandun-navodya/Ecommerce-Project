import ProductCard from './productCard'

export default function TrendingProducts() {

    return (
        <div>
            <h1>Trending</h1>
            <ProductCard name="Macbook Air" image="https://picsum.photos/200/300" price="LKR 150,000.00/=" />
            <ProductCard name="Dell XPS" image="https://picsum.photos/200/300" price="LKR 120,000.00/=" />
            <ProductCard name="HP Spectre" image="https://picsum.photos/200/300" price="LKR 130,000.00/=" />

        </div>
    );
}