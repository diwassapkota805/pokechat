import React, { useState } from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import { CHAT_API } from '../AppConfig';

const ChatForm = ({ setSearchResults }) => {
    const [activeQuery, setActiveQuery] = useState('');

    const chat = (query) => {
        const url = `${CHAT_API}/chat/query`;
        axios
            .get(url, {
                params: {
                    q: query,
                },
            })
            .then((response) => {
                const pokemonIDs = response.data.map(pokemon => pokemon.id);
                setSearchResults(pokemonIDs); // Update the state with only IDs
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleSendClick = () => {
        if (activeQuery.trim() !== '') {
            chat(activeQuery);
            setActiveQuery('');
        }
    };

    const handleLabelClick = (query) => {
        chat(query);
    };

    const handleInputChange = (e) => {
        setActiveQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            console.log("Enter is pressed");
            chat(activeQuery);
            setActiveQuery('');
        }
    }

    return (
        <div className='chat'>
            <Input
                fluid
                icon={<Icon name='send' inverted circular link onClick={handleSendClick} />}
                placeholder='Ask me a Pokemon Question...'
                value={activeQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <Label pointing='above' onClick={() => handleLabelClick('strongest pokemon limit 1')}>
                Strongest Pokemon
            </Label>
            <Label pointing='above' onClick={() => handleLabelClick('weakest pokemon limit 1')}>
                Weakest Pokemon
            </Label>
            <Label pointing='above' onClick={() => handleLabelClick('starter pokemon limit 3')}>
                Starter Pokemon
            </Label>
        </div>
    );
};

export { ChatForm };
