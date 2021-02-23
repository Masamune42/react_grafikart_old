const PRODUCTS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

// Représente une ligne d'article
function ProductRow({ product }) {
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

// Représente une ligne de catégorie
function ProductCategoryRow({ category }) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

// Fonction créant la table de produits
function ProductTable({ products }) {
    // Tableau qui va contenir toutes les lignes à afficher
    const rows = []
    // Représente la catégorie de l'article inséré
    let lastCategory = null
    // Pour chaque article
    products.forEach(product => {
        // Si la catégorie du dernier article inséré est différente
        if (product.category !== lastCategory) {
            // On récupère sa nouvelle catégorie
            lastCategory = product.category
            // On insère la ligne de catégorie dans le tableau
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category} />)
        }
        // On insère la ligne d'article
        rows.push(<ProductRow key={product.name} product={product} />)
    })
    // On retoune le tableau
    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

class FilterableProductTable extends React.Component {
    render() {
        const { products } = this.props;
        return <ProductTable products={products} />
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />,
    document.querySelector('#app')
)