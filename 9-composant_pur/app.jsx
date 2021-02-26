const PRODUCTS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

// Représente une ligne d'article
// On crée un composant pur, memo = mémorisation
// Evite de recharger les éléments si il n'ya en a pas qui ont changé
const ProductRow = React.memo(function ({ product }) {
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    console.log('render product');
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
})

// 2e méthode d'appeler un composant pur
// const ProductRow = React.memo(ProductRowComponent)

// Représente une ligne de catégorie
function ProductCategoryRow({ category }) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        // C'est important de définir les bind des callback ici, si on le fait directement à l'envoi dans un onChange, React va déterminer que ce sont des callbacks diférents à chaque fois et va refaire tout le rendu
        this.handlefilterTextChange = this.handlefilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handlefilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render() {
        const { filterText, inStockOnly } = this.props
        return <div className="mb-3">
            <div className="form-group">
                {/* On fait remonter au parant l'information rentrée avec le onChange */}
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handlefilterTextChange} />
            </div>
            <div className="form-check">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockChange} />
                <label htmlFor="stock" className="form-check-label">Produit en stock</label>
            </div>
        </div>
    }
}

// Fonction créant la table de produits
function ProductTable({ products, inStockOnly, filterText }) {
    // Tableau qui va contenir toutes les lignes à afficher
    const rows = []
    // Représente la catégorie de l'article inséré
    let lastCategory = null
    // Pour chaque article
    products.forEach(product => {
        // Si le produit n'est pas en stock (vérif : case cochée + la variable stocked de l'article = false)
        // OU si ne trouve pas le texte recherché dans le nom de l'article, on return = aucun article ne correspond, donc ne ne l'affiche pas
        if (
            (inStockOnly && !product.stocked) ||
            (!product.name.toLowerCase().includes(filterText.toLowerCase()))
        ) {
            return
        }
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

class FilterableProductTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterChange(filterText) {
        this.setState({ filterText })
    }

    handleInStockChange(inStockOnly) {
        this.setState({ inStockOnly })
    }

    render() {
        console.log('render');
        const { products } = this.props;
        return <React.Fragment>
            {JSON.stringify(this.state)}
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterChange}
                onStockChange={this.handleInStockChange}
            />
            <ProductTable
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />,
    document.querySelector('#app')
)

// Si on veut ajouter des éléments à un autre
// Pour ajouter à la fin : [newItem, ...Items]
// On peut aussi utiliser Object.assign(...)
const PRODUCTS2 = [...PRODUCTS, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 8" }]

setTimeout(() => {
    ReactDOM.render(<FilterableProductTable products={PRODUCTS2} />,
        document.querySelector('#app')
    )
}, 2000);
