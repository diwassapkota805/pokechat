import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem, Button } from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';


const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [currentSprite, setCurrentSprite] = useState('front_default');
    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT 
        const fetchData = async () => {
            try {
                const response = await axios.get(`${POKE_API}/pokemon/${pokemonID}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [pokemonID]);

    const typesToColors ={
        normal: 'grey',
        fire: 'red',
        water: 'blue',
        electric: 'yellow',
        grass: 'green',
        ice: 'teal',
        fighting: 'orange',
        poison: 'purple',
        ground: 'brown',
        flying: 'pink',
        psychic: 'violet',
        bug: 'olive',
        rock: 'brown',
        ghost: 'grey',
        dragon: 'black',
        dark: 'black',
        steel: 'grey',
        fairy: 'pink'
    }

    const handleSpriteChange = (sprite) => {
        setCurrentSprite(sprite);
    }
    
    return (
        <Card>
            {data && (
                <Card>
                    <Image src={data.sprites[currentSprite]} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Card.Header>
                        <Card.Meta>
                            {data.types.map((type, slot) => (
                                <Label key={slot} color={typesToColors[type.type.name]}>{type.type.name}</Label>
                            ))}
                        </Card.Meta>

                        <Card.Description>
                        <List divided verticalAligh='right' color='green'>
                               {data.stats.map((stat) => (
                                    <ListItem key={stat.stat.name}>
                                        <List.Content floated='right'>
                                            <List.Description>{stat.base_stat}</List.Description>
                                        </List.Content>
                                        <List.Header>{stat.stat.name}</List.Header>
                                    </ListItem>
                               ))}
                            </List>
                        </Card.Description>
                    </Card.Content>
                    

                    
                    <Card.Content extra>
                        {Object.keys(data.sprites)
                            .slice(0, 8) // Select the first eight sprites becaue the rest are not useful
                            .filter(sprite => data.sprites[sprite] !== null)
                            .map((spriteName, index) => (
                                <Button
                                    key={index}
                                    basic
                                    color='blue'
                                    onClick={() => handleSpriteChange(spriteName)}
                                >
                                    {spriteName}
                                </Button>
                        ))}
                    </Card.Content>


                </Card>
            )}
        </Card>
    );
}

export {PokemonCard};