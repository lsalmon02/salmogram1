import { useRef, useState } from 'react'
import classes from './login-form.module.css'
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'
import Spinner from '../extras/spinner';

function LoginForm() {

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const delay = ms => new Promise(res => setTimeout(res, ms));


    const submitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //do some validation

        const result = await signIn("credentials", {
            redirect: false,
            username: enteredUsername,
            password: enteredPassword
        });

        if (!result.error) {
            await router.replace('/home')
            setIsLoading(false)
        }
        setIsLoading(false)
        setError(result.error)


    }

    if (error) {
        delay(4000).then(() => {
            setError(null)
        })
        
    }
    

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className={classes.main}>
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={usernameInputRef} />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" ref={passwordInputRef} />
                </div>
                <div className={classes.action}>
                <button type='submit' className={classes.button}>Login</button>
                </div>
            </form>
            {error && <h1 className="error">{error}</h1>}

            <p>Not got an account? <a href='/auth/signup'>Sign Up</a> now!</p>
        </section>

        </div>
    )
}


export default LoginForm;