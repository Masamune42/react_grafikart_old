// Fonction qui crée un champ texte
// param en destructuring
function Field({ name, value, onChange, children }) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
    </div>
}

// Fonction qui crée un checkbox
function Checkbox({ name, value, onChange, children }) {
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        // Valeur initial des champs
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Fonction qui permet la modification d'un champs en détectant son type
    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    // Fonction qui permet de récupérer les informations du formulaire au submit
    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false
        })
        console.log(data);
    }

    render() {
        // On utilise les fonctions pour créer des champs grâce aux composants
        return <form className="container" onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange}>S'abonnr à la newsletter</Checkbox>
            <div className="form-group">
                <button className="btn btn-primary">Envoyer</button>
            </div>
            {JSON.stringify(this.state)}
        </form>
    }
}

ReactDOM.render(<Home />, document.querySelector('#app'))


