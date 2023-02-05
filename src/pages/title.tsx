// Dependencies
import React,{useReducer} from "react";
import { useDispatch } from "react-redux";
import { Button,Box,Container } from "@mui/material";
// Styles
import "@/styles/title.scss";
// Components
import { authActions } from "@/store/store";

const Title:React.FC = ():JSX.Element => {
    const dispatch = useDispatch();
    return (
        <Container className="title">
            <Button variant="outlined" onClick={()=>{dispatch(authActions.toggleDarkMode())}}>Button</Button>
        </Container>
    )
}

export default Title