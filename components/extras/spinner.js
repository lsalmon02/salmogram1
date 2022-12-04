import { Fragment } from "react";
import classes from './spinner.module.css'

function Spinner() {

    return (
        <div className={classes.container}>
            <img className={classes.spinner} src="/loader.png" alt="Loading..." />
        </div>
    )
}

export default Spinner;