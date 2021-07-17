import { useHistory } from 'react-router-dom';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredNewPassword = newPasswordInputRef.current.value;
        // Add validation
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSFShuPXieRY3QCpyfQ6CDdByhsz_nkCw',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecureToken: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => {
            // Assumption: Always succeeds! Instead catch Errors and we want to keep it simple in this example
            history.replace('/');
        });
    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    minLength="7"
                    ref={newPasswordInputRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;