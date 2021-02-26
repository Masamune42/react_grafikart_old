class Home extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        // On crée une ref pour pouvoir récupérer le champ input
        // MAIS ATTENTION : cela va en contradiction avec ce qui est fait dans React
        // On peut l'utiliser pour :
        //  - 1. des champs non contrôlés et que l'on veut récupérer la valeur. Dans ce cas, le champ n'a pas de value donc pas contrôlé par React
        //  - 2. Brancher des éléments externes à React (ex librairie JS)
        this.input = React.createRef()
    }

    handleClick(e) {
        // Pour récupérer la valeur de l'input, on doit aller la chercher dans la propriété current
        console.log(this.input.current.value)
    }

    render() {
        console.log(this.input);
        return <div>
            <input type="text" ref={this.input} />
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }
}

ReactDOM.render(<Home />, document.querySelector('#app'))