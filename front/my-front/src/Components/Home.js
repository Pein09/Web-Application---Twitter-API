import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Typography, Button} from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info";
//import PhotoIcon from "@material-ui/icons/Photo";


function Home(){

    const navigate = useNavigate();

    return <Fragment>
        <Typography variant="h6">
            Aplicatie de monitorizare a unei firme folosind Twitter API
        </Typography>
<ButtonGroup variant="contained">
<Button
startIcon = {<InfoIcon />} color ="primary" size = "small"
onClick={function onClick(){
navigate("/about");
}}
>Go to about</Button>
<Button
startIcon = {<InfoIcon />} color ="secondary" size = "small"
onClick={function onClick(){
navigate("/tweets");
}}
>Go to tweets</Button>

</ButtonGroup>

<p>
<img src={require("./images2/Palantir_logo.jpg")} alt="" Logo height={250} width={1000} class="center"></img>
</p>
    </Fragment>;

}

export default Home;