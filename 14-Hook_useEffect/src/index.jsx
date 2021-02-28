import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import './index.css'

function useIncrement(initial, step) {
    const [count, setCount] = useState(initial)
    const increment = () => {
        setCount(c => c + step)
    }
    return [count, increment]
}

function Compteur() {
    const [count, increment] = useIncrement(0, 2)
    // On déclare useEffect avec en 1er paramètre une fonction qui va faire un traitement
    // En 2e paramètre, un tableau des valeurs à observer (le code du useEffect sera exécuté à chaque fois que cette valeur change)
    // Si le 2e param est un tableau vide, useEffect sera équivalent à la fonction componenDidMount
    useEffect(() => {
        const timer = window.setInterval(() => {
            increment(count)
        }, 1000)

        // Fonction quand on démonte le composant
        return function () {
            clearInterval(timer)
        }
    }, [count])
    // On peut créer des hook pour gérer chaque élément, exemple ici : 1 pour gérer le compteur et 2 pour gérer le titre
    useEffect(() => {
        document.title = 'Compteur ' + count
    }, [count])

    return <button onClick={increment}>Incrémenter {count}</button>
}

render(
    <div>
        <Compteur />
    </div>,
    document.getElementById('app')
)

// window.setTimeout(() => {
//     render(
//         <div>Bonjour</div>,
//         document.getElementById('app')
//     )
// }, 2000)