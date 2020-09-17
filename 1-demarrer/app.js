let n = 0;

function render() {
    // Crée un élément qui pourra être utilisé par d'autres outils
    const title = React.createElement('h1', {},
        'Bonjour tout le monde ',
        React.createElement('span', {}, n));

    // 1er param : élément React, 2e param : l'élément dans lequel on veut brancher l'élément
    // React va comparer les éléments qu'il avait avant et après et va changer ce qui a changé
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