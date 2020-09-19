// 1. APPROCHE FONCTIONNELLE
// AVANT
// function Welcome(props) {
//     console.log(props);
//     return <h1>Bonjour {props.name}</h1>
// }

// APRES :
// On récupère name dans un objet en utilisant le destructuring
// function Welcome({name}) {
//     return <h1>Bonjour {name}</h1>
// }

// On appelle la fonction Welcome avec en paramètre name et on place l'élément dans #app
// ReactDOM.render(<Welcome name="Jean" />, document.querySelector('#app'))

// Même fonction mais en utilisant la propriété children (qui est toujours là) pour récupérer le texte entre fonction
// function Welcome({ name, children }) {
//     return <div>
//         <h1>Bonjour {name}</h1>
//         <p>{children}</p>
//     </div>
// }
// ReactDOM.render(<Welcome name="Jean">Bonjour tout le monde</Welcome>, document.querySelector('#app'))

// 1. APPROCHE CLASSE
function WelcomeFunc({ name, children }) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
    </div>
}

class Welcome extends React.Component {

    // Les propriétés sont passées au niveau du constructeur
    // Le constructeur n'est pas obligé d'être déclaré si aucune action spécifique n'est à faire
    constructor(props) {
        // On est obligé d'utiliser super pour appeler la méthode parente
        super(props)
        console.log(props);
    }
    // render s'occupe du rendu et retourne un élément
    render() {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>{this.props.children}</p>
        </div>
    }
}
// ReactDOM.render(<Welcome name="Jean">Bonjour tout le monde</Welcome>, document.querySelector('#app'))


// ReactDOM.render(<Home />, document.querySelector('#app'))

// Classe qui affiche l'heure, doit étendre de React.Component
// Aussi appelé composant
class Clock extends React.Component {

    constructor(props) {
        super(props);
        // this.state = état du composant, objets qui sont utiles à l'intérieur du composant et non affectées par les propriétés
        this.state = { date: new Date() }
        this.timer = null;
    }

    // Fonction qui détermine quand un composant a été monté
    componentDidMount() {
        // On veut forcer la valeur this en gardant celle actuelle (this = Clock)
        // Si pas de bind : this = window car la fonction setInterval est appelée dessus
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    tick() {
        // Change l'état d'un composant
        this.setState({ date: new Date() })
    }

    // Fonction qui détermine quand un composant est supprimé
    componentwillUnMount() {
        this.timer = window.clearInterval(this.timer);
    }

    render() {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {
    // Pas encore supporté par tous les navigateurs
    // static defaultProps = {
    //     start: 0,
    //     step: 1
    // }
    constructor(props) {
        super(props);
        // On déclare que n est le nombre de départ dans l'état
        this.state = { n: props.start, timer: null };
        // Pour optimiser les performances, on déclare les fonction appelées dans le render() comme ceci
        this.toggle = this.toggle.bind(this);
        this.reset = this.reset.bind(this);
    }

    // Fonction qui détermine quand un composant a été monté
    componentDidMount() {
        // Démarre timer quand on monte le composant
        this.play()
    }

    // Fonction qui détermine quand un composant est supprimé
    // Ne pas mettre de SetState ici, sinon problèmes
    componentwillUnMount() {
        window.clearInterval(this.state.timer)
    }

    increment() {
        // Change l'état d'un composant
        // Déconseillé
        // this.setState({ n: this.state.n + 1 })
        // Conseillé : utiliser les fonctions avec state et props en param, surtout sur plusieurs setState consécutifs sont appelés
        this.setState((state, props) => ({ n: state.n + props.step }))
    }

    pause() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })
    }

    play() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000)
        })
    }

    label() {
        return this.state.timer ? 'Pause' : 'Lecture';
    }

    toggle() {
        return this.state.timer ? this.pause() : this.play();
    }

    reset() {
        // Quand on utilise props ou state dans setState, il faut utiliser la fonction
        this.setState((state, props) => ({ n: props.start }))
    }

    render() {
        return <div>
            Valeur {this.state.n}
            <button onClick={this.toggle}>{this.label()}</button>
            <button onClick={this.reset}>Réinitialiser</button>
        </div>
    }
}
// Mettre des valeurs par défaut
Incrementer.defaultProps = {
    start: 0,
    step: 1
}

// Création d'un incrémenteur manuel
class ManualIncrementer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { n: 0 }
    }

    increment(e) {
        console.log(e);
        this.setState((state, props) => ({ n: state.n + 1 }))
    }

    render() {
        return <div>Valeur : {this.state.n} <button onClick={this.increment.bind(this)}>Incrémenter</button></div>
    }
}
// Lorsque le composant est monté, automatiquement il appelle le componentDidMount qui va demander une mise à jour de l'état toutes les secondes
// A chaque fois que l'état se met à jour, il va réutiliser le render : comparaison des modifs + applications des changements
ReactDOM.render(<Home />, document.querySelector('#app'))

function Home() {
    return <div>
        <Welcome name="Dorothée" />
        <Welcome name="Jean" />
        <Incrementer start={5} />
    </div>
}

/* PARTIE EVENEMENT */