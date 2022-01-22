import { useState , Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";

function Nav(){
    const navStyleState = useState({color: "white"});
    const navigate = useNavigate();
    
    
  return ( <Fragment>
     <AppBar style={{position: "relative"}}>
         <Toolbar>
             <Typography variant="h6">
                <Button
                    style = {navStyleState[0]}
                    onClick={function onClick(){
                        navigate("/");   
                    }
                    }
                    >
                    Back to main
                </Button>
             </Typography>
                    
          <ul className="nav-Links">
            <Link to={"/about"} className="nav-link">
              <li>About</li>
                </Link>
            <Link to={"/tweets"} className="nav-link">
                <li>Tweets</li>
                </Link>
            </ul>
         </Toolbar>
         </AppBar>   
    </Fragment>
  );
}


export default Nav;