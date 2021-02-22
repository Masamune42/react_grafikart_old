const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

// Fonction pour convertir des Fahrenheit en Celsius
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

// Fonction pour convertir des Celsius en Fahrenheit
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

// Fonction qui détermine si l'eau bout
function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success mt-3">L'eau bout</div>
    } else {
        return <div className="alert alert-info mt-3">L'eau ne bout pas</div>
    }
}

// Classe qui gère les inputs
class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    // On défini handleChange suivant le type de fonction reçue dans le paramètre onTemperatureChange et on l'utilise avec la valeur de température rentrée dans le champ
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        // On récupère le paramètre temperature
        const { temperature } = this.props
        // On récupère le paramètre scale pour le nom
        const name = 'scale' + this.props.scale
        // On utilise le paramètre scale pour définir le type d'unité
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
            <label htmlFor={name}>Température (en {scaleName})</label>
            <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange} />
        </div>
    }
}

// Permet de vérifier si la température est un nombre, dans ce cas renvoie le nombre arrondi à la centième près, sinon renvoie une chaine vide
function tryConvert(temperature, convert) {
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return '';
    }
    return (Math.round(convert(value) * 100) / 100).toString()
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    // Fonction qui reçoit une temperature et indique qu'elle est en celsius avec scale 
    handleCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    // Fonction qui reçoit une temperature et indique qu'elle est en fahrenheit avec scale 
    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render() {
        // On récupère les états
        const { temperature, scale } = this.state
        // Si l'état est 'c' (= si on écrit dans le champ des celsius), alors celsius = temperature, sinon celsius = la conversion de la temperature
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        // Idem dans l'autre sens
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            {/* On utilise la classe TemperatureInput en passant en paramètre : temperature, scale & onTemperatureChange (fonction) */}
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    }
}

ReactDOM.render(<Calculator />, document.getElementById('app'))