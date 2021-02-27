// Exemple 2.2 : Pour faire descendre la référence, type classe
class Field extends React.Component {

    render() {
        return <div className="form-group">
            <label htmlFor="">{this.props.label}</label>
            <input type="text" className="form-control" ref={this.props.forwardRef} />
        </div>
    }
}

// React.forwardRef permet de faire suivre la ref
const FieldWithRef = React.forwardRef((props, ref) => {
    // Le ...props permet de récupérer toutes les propriétés de props (ici label)
    return <Field forwardRef={ref} {...props} />
})

// Exemple 2.1 : Pour faire descendre la référence, type fonction
// const Field = React.forwardRef(function (props, ref) {
//     return <div className="form-group">
//         <input type="text" className="form-control" ref={ref}/>
//     </div>
// })

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
        // Pour l'exemple 2
        return <div>
            {/* Exemple 2.1 */}
            {/* <Field ref={this.input}></Field> */}
            {/* Exemple 2.2 */}
            <FieldWithRef ref={this.input} label="demo"></FieldWithRef>
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }

    // Pour l'exemple 1
    // render() {
    //     console.log(this.input);
    //     return <div>
    //         <input type="text" ref={this.input} />
    //         <button onClick={this.handleClick}>Tester</button>
    //     </div>
    // }
}

ReactDOM.render(<Home />, document.querySelector('#app'))