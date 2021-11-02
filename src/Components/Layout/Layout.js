import * as React from 'react';
import classes from './Layout.module.css'


export default function Layout({children}){


    return <div>
        <div className={classes.header}>Header</div>
        <div>{children}</div>
    </div>
}