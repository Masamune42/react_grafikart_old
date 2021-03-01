import { render } from 'react-dom'
import React, { useEffect, useState } from 'react'

// Création d'un hook personnalisé pour incrémenter une valeur avec en paramètre : la valeur initiale + le pas
function useIncrement(initialValue = 0, step = 1) {
    const [count, setCount] = useState(initialValue)

    const increment = function () {
        setCount(c => c + step)
    }

    return [
        count,
        increment
    ]
}

// Création d'un hook personnalisé pour incrémenter une valeur en paramètre toutes les secondes
// Combinaison avec le hook useIncrement
function useAutoIncrement(initialValue = 0, step = 1) {
    // Utilisation du hook d'increment
    const [count, increment] = useIncrement(initialValue, step)

    useEffect(function () {
        const timer = window.setInterval(function () {
            // On utilise la fonction increment définie dans useIncrement
            increment()
        }, 1000)

        return function () {
            clearInterval(timer)
        }
    }, [])

    return count
}

// Création d'un hook personnalisé pour rendre visible le bouton d'incrémentation via une checkbox
function useToggle(initialValue = true) {
    const [value, setValue] = useState(initialValue)

    const toggle = function () {
        setValue(v => !v)
    }

    return [
        value,
        toggle
    ]
}


function Compteur() {
    // const [count, increment] = useIncrement(10, 1)
    // const count = useIncrement(10, 1)
    const count = useAutoIncrement(0, 10)
    // return <button onClick={increment}>Incrémenter {count}</button>
    return <button>Incrémenter {count}</button>
}

function App() {
    const [compteurVisible, toggleCompteur] = useToggle(true)
    return <div>
        Afficher le compteur <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
        <br />
        {compteurVisible && <Compteur />}
    </div>
}

render(
    <App />,
    document.getElementById('app')
)