import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Spinner from '../extras/spinner';
import classes from './signup-form.module.css';

async function createUser(email, username, name, password) {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, username, name, password}),
        headers: { 
            'Content-Type': "application/json"
        }
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went Wrong");
    }

    return data;
}

function SignupForm() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const emailInputRef = useRef()
    const usernameInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter()
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const enteredEmail = emailInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        try {
            const result = await createUser(enteredEmail, enteredUsername, enteredName, enteredPassword);
            console.log(result)
            router.replace('/auth/login')

            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(error)
        }
        
    }

    if (error) {
        delay(4000).then(() => {
            setError(null)
        })
        
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className={classes.main}>
        <section className={classes.auth}>
            <h1>Sign Up Today!</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required ref={emailInputRef}/>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={usernameInputRef} />
                    <label htmlFor='name'>Full Name</label>
                    <input type="text" id="name" ref={nameInputRef} />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" ref={passwordInputRef} />
                </div>
                <div className={classes.action}>
                <button type='submit' className={classes.button}>Register</button>
                </div>
            </form>
            {error && <h1 className='error'>{error}</h1>}
        </section>

        </div>
    )
}

export default SignupForm;
