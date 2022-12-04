import classes from './starting-page.module.css'

function StartingPageContent() {


    return (
        <div className={classes.main}>
        <section className={classes.welcome}>
            <h1 className={classes.head}>SalmoGram</h1>
            <p className={classes.description}>The new exciting App to showcase your greatest pictures and adventures</p>
        </section>
        </div>
    )

}

export default StartingPageContent;