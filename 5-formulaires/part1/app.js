class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Champ texte simple
            // nom: 'demo2'
            // Champ texte multiple
            // nom: ['demo2', 'demo1']
            checked: true
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    // Fonction qui détecte l'évènement sur un champ et attribut la valeur du changement à celui de value=nom
    handleChange(e) {
        this.setState({
            // Champ texte simple
            // nom: e.target.value
            // Champ texte multiple
            // nom : Array.from(e.target.selectedOptions).map(o => o.value)
            // Champ radio / checkbox
            checked: e.target.checked
        })
    }

    render() {
        // On appelle la fonction handleChange dès qu'il y a un changement dans le champ
        // Exemple d'utilisation pour plusieurs types de champs
        return <div>
            <label htmlFor="nom">Mon nom</label>
            {/* Champ text */}
            {/* <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange} /> */}
            {/* Champ textarea */}
            {/* <textarea id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}></textarea> */}
            {/* Champ select */}
            {/* <select value={this.state.nom} onChange={this.handleChange} multiple>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select> */}
            {/* Champ radio */}
            <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}></input>

            {this.state.checked ? <div>Message affiché si on coche la checkbox</div> : null}
        </div>
    }
}

// Lorsque le composant est monté, automatiquement il appelle le componentDidMount qui va demander une mise à jour de l'état toutes les secondes
// A chaque fois que l'état se met à jour, il va réutiliser le render : comparaison des modifs + applications des changements
ReactDOM.render(<Home />, document.querySelector('#app'))


