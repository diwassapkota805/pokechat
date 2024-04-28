
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    const [activeQuery, setActiveQuery] = useState('');
    const chat = ()=>{
        // AXIOS GET on the POKECHAT API POINT 

        const url = `${CHAT_API}/chat/query`;
        axios.get(url, {
            params: {
                q: activeQuery
            }
        })
        .then((response)=>{
            setSearchResults(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            console.log('error')
            console.log(error);
        });

    }

    const handleInputChange = (e)=> {
        setActiveQuery(e.target.value);
    }

    const handleSendClick = () => {
        chat();
        setActiveQuery('');
    }

    const handleLabelClick = (e)=>{
        const query = e.target.message;
        setActiveQuery(query);
        chat();
    }


    return (
    <div className='chat'>
        <Input fluid 
        icon={<Icon name='send' inverted circular link onClick={handleSendClick}/>}
        placeholder='Ask me a Pokemon Question...'
        onChange={handleInputChange}
        />
        <Label pointing='above' message="strongest pokemon limit 1" onClick={handleLabelClick}> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon limit 1" onClick={handleLabelClick}> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon limit 3" onClick={handleLabelClick}> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
