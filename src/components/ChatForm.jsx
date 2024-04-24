
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    const [activeQuery, setActiveQuery] = useState('');
    const chat = (query)=>{
        // AXIOS GET on the POKECHAT API POINT 

        const url = `${CHAT_API}/chat/query`;
        axios.get(url, {
            params: {
                q: query
            }
        })
        .then((response)=>{
            setSearchResults(response.data);
        })
        .catch((error)=>{
            console.log('error')
            console.log(error);
        });

    }

    const handleLabelClick = (e)=>{
        console.log('you clicked a label')
        const query = e.target.message;
        console.log('you clicked a label')
        setActiveQuery(query);
        console.log('you clicked a label')
        chat(activeQuery);
    }

    return (
    <div className='chat'>
        <Input fluid 
        icon={<Icon name='send' inverted circular link />}
        placeholder='Ask me a Pokemon Question...'
        />
        <Label pointing='above' message="strongest pokemon limit 1" onClick={handleLabelClick}> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon limit 1" onClick={handleLabelClick}> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon limit 3" onClick={handleLabelClick}> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
