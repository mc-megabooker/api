import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface ICreateApartment { }

const CreateApartment: FunctionComponent<any> = (props) => {
    return (
        <div>
            <ul style={{ listStyle: 'none' }}>
                <li>
                    <Typography variant='button'>
                        <Link to="/create-apartment">Create apartment</Link>
                    </Typography>
                </li>
                <li>
                    <Typography variant='button'>
                        <Link to="/apartment-list">Apartment list</Link>
                    </Typography>
                </li>
            </ul>
        </div>
    )
}

export default CreateApartment;
