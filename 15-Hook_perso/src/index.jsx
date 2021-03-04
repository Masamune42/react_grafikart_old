import { render } from 'react-dom'
import React, { useEffect, useState } from 'react'
import regeneratorRuntime from "regenerator-runtime"

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

function useFetch(url) {
    const [state, setState] = useState({
        items: [],
        loading: true
    })

    useEffect(function () {
        // On délare une fonction qui s'auto appelle pour faire une promesse
        (async function () {
            const response = await fetch(url)
            const responseData = await response.json()
            if (response.ok) {
                setState({
                    items: responseData,
                    loading: false
                })
            } else {
                alert(JSON.stringify(responseData))
                // Destructuring : on récupère tous les éléments de state (s) et on modifie loading
                setState(s=> ({...s, loading: false}))
            }
        })()
    }, [])

    return [
        state.loading,
        state.items
    ]
}

function App() {
    const [compteurVisible, toggleCompteur] = useToggle(true)
    return <div>
        Afficher le compteur <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
        <br />
        {compteurVisible && <Compteur />}
        <TodoList />
        <PostTable />
    </div>
}

// Exemple avec Tableau en utilisant la logique séparée dans une fonction
function PostTable() {

    const [loading, items] = useFetch('https://jsonplaceholder.typicode.com/comments?_limit=10')

    if (loading) {
        return 'Chargement...'
    }
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contenu</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
            </tr>)}
        </tbody>
    </table>
}

// Exemple avec Todo: sans séparation de la partie de la logique
function TodoList() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        // On délare une fonction qui s'auto appelle pour faire une promesse
        (async function () {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const responseData = await response.json()
            if (response.ok) {
                setTodos(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return 'Chargement...'
    }
    return <ul>
        {todos.map(t => <li key={t.id}>{t.title}</li>)}
    </ul>
}

render(
    <App />,
    document.getElementById('app')
)