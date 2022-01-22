import { Typography } from "@material-ui/core";
import {Fragment} from "react";

function About(){
    return <Fragment>
        
        <Typography variant = "h6">
            About Palantir
        </Typography>
        

        <div>
            <p class="center">
             Aplicatia are ca scop interogarea prin Twitter API a datelor existente in ultima perioada pe platforma Twitter, in scopul monitorizarii unei firme/ a unui business, pentru obtinerea unor date de interes pentru un anumit client. In partea de backend ne-am axat pe extragerea unor date despre prima criptomoneda romaneasca Elrond, sens in care in urma conexiunii la Twitter API am extras ultimele x tweeturi despre Elrond/ Egld, cu date despre acestea pentru a fi analizate ulterior.
            </p>
        </div>
    </Fragment>
}

export default About;