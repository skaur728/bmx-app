import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Router from 'next/router'



async function createUser(email, password) {
    
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    //console.log(response)

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}

function AuthForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    //const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    /*
    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }
    */
    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

            try {
                const result = await createUser(enteredEmail, enteredPassword);
                Router.push('/user/auth')
                //console.log(result);
            } catch (error) {
                //console.log(error);
            }
       // }
    }

    return (
        <section>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </section>
    );
}

export default AuthForm;