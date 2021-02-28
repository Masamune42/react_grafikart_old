import { render } from 'react-dom'
import React, { useState } from 'react'
import './index.css'

// Exemple de création d'un hook (Exemple 4)
function useIncrement(initial, step) {
    const [count, setCount] = useState(initial)
    const increment = () => {
        setCount(c => c + step)
    }
    return [count, increment]
}

function Compteur() {
    // On appelle useState en lui passant un état qui sera enregistrée dans la 1ère clé
    // En seconde clé, on a un callback qui va modifier l'état de la 1ère clé
    // useState ne peut pas être dans une condition ou une boucle, si on fait ça on peut changer l'ordre des appels et poser des problèmes sur l'ordre des hooks

    // Exemple 1
    // const [count, setCount] = useState(0)
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     setCount(count + 1)
    // }
    // return <button onClick={handleClick}>Nombre : {count}</button>

    // Exemple 2
    // Le setState créé est différent car on change totalement l'objet à l'intérieur avec le clic
    // Pour contourner ça, on récupère l'état dans un callback et on retourne l'état précédent avec une nouvelle valeur
    // const [state, setState] = useState({ a: 1 })
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     setState(state => {
    //         return { ...state, count: 10 }
    //     })
    // }
    // return <div onClick={handleClick}>{JSON.stringify(state)}</div>

    // Exemple 3
    // const [count, setCount] = useState(0)
    // const [count2, setCount2] = useState(0)

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     // Il faut toujours utiliser un callback pour modifier l'état d'un objet
    //     setCount(c => c + 1)
    // }

    // const handleClick2 = (e) => {
    //     e.preventDefault()
    //     // Il faut toujours utiliser un callback pour modifier l'état d'un objet
    //     setCount2(c => c + 1)
    // }

    // return <>
    //     <button onClick={handleClick}>Incrémenter {count}</button>
    //     <button onClick={handleClick2}>Incrémenter {count2}</button>
    // </>

    // Exemple 4
    const [count, increment] = useIncrement(0, 2)
    return <>
        <button onClick={increment}>Incrémenter {count}</button>
    </>
}

render(
    <div>
        <Compteur />
    </div>,
    document.getElementById('app')
)