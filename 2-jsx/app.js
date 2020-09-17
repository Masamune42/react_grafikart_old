let n = 0;

function numberFormat(n) {
    return n.toString().padStart(2, '0')
}

function render() {
    const items = [
        'Tache 1',
        'Tache 2',
        'Tache 3'
    ]
    // Les class (utilisé en JS) HTML en JSX s'écrivent className
    const title = <React.Fragment>
        <h1 className="title" id="title">
            Bonjour les gens <span>{n}</span>
        </h1>
        <ul>{items.map((item, k) => <li key={k}>{item}</li>)}</ul>
    </React.Fragment>
    ReactDOM.render(title, document.querySelector('#app'));
}

// Fait la même chose mais modifie la totalité des éléments indiqués
// function render2 () {
//     document.querySelector('#app').innerHTML = '<h1>Bonjour tout le monde '+ n +' </h1>'
// }
// render()

// On appelle la fonction toutes les secondes
// Appeler la même fonction ne modifie pas tout le code mais simplement celui qui change
// React va détecter à chaque render que la seule chose qui change c'est le contenu du span
window.setInterval(() => {
    n++;
    render()
}, 1000)