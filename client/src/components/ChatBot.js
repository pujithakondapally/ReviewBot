import React,{useState} from 'react';
import axios from 'axios'
import {Container,TextField,Button,Typography,Paper,Box} from '@mui/material';
import './ChatBot.css'

const ChatBot = () => {
    return (
        <div className = "root">
            <Container>
                <Paper elevation={3} classname="paper">
                    <div className="header">
                    <img className="image" src="./HomePageImage.png" alt="store icon" />
                    <Typography variant="h4" align="center">ReviewBot</Typography>
                    </div>
                    <Box mt={3} mb={3}>
                    <div className='input-container'>
                        <TextField
                        fullWidth
                        variant="outlined"
                        label="Type your message..."
                        />
                        <button
                        style={{backgroundColor:'#f17d02'}}
                        variant="contained"
                        className="button-send"
                        >
                        <i class="fa-solid fa-paper-plane send-icon"></i>
                        </button>
                    </div>
                </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default ChatBot;