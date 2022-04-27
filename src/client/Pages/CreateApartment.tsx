import React, { FunctionComponent, useState } from 'react';
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
    Checkbox
  } from "@material-ui/core";
  import { Col } from "react-bootstrap";
  import { IPrice, IFacility, IPhoto, IApartment } from '../../server/domain/IApartment';
  import { Post } from "../Services";
  import { apiRoute } from '../utils';

interface ICreateApartmentForm { 
    lat: number;
    lng: number;
    maxPersons: number;
    generalMinimumStay: number,
    generalMinimumPrice: IPrice,
    active: boolean,
    apartmentType: string,
    facilities: Array<IFacility>,
    photos: Array<IPhoto>
}

const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));

const CreateApartment: FunctionComponent<ICreateApartmentForm> = (props) => {
    const { heading, submitButton } = useStyles();

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [maxPersons, setMaxPersons] = useState(null);
    const [generalMinimumStay, setGeneralMinimumStay] = useState(null);
    const [generalMinimumPriceAmount, setGeneralMinimumPriceAmount] = useState(null);
    const [generalMinimumPriceCurrency, setGeneralMinimumPriceCurrency] = useState(null);
    const [active, setActive] = useState(false);
    const [apartmentType, setApartmentType] = useState('');
    const [allPhotos, setAllPhotos] = useState([
        { url: "", position: null },
    ]);
    const [allFacilities, setAllFacilities] = useState([
        { name: "" },
    ]);

    const handleAddPhotos = () => {
        const values = [...allPhotos];
        values.push({
          url: "",
          position: null,
        });
        setAllPhotos(values);
      };
    
      const handleRemovePhoto = (index) => {
        const values = [...allPhotos];
        values.splice(index, 1);
        setAllPhotos(values);
      };
    
      const handlePhotosInputChange = (index, event) => {
        const values = [...allPhotos];
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setAllPhotos(values);
      };

      const handleAddFacilities = () => {
        const values = [...allFacilities];
        values.push({
          name: "",
        });
        setAllFacilities(values);
      };
    
      const handleRemoveFacilities = (index) => {
        const values = [...allFacilities];
        values.splice(index, 1);
        setAllFacilities(values);
      };
    
      const handleFacilitiesInputChange = (index, event) => {
        const values = [...allFacilities];
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setAllFacilities(values);
      };
      
      const handleInputChange = (e, setter) => {
          setter(e.target.value);
      };

      const handleActiveChange = (e) => {
          setActive(e.target.checked)
      };

      const handleSubmit = async (): Promise<void> => {
        const obj = {
            "lat": parseFloat(lat),
            "lng": parseFloat(lng),
            "maxPersons": parseInt(maxPersons),
            "generalMinimumStay": parseInt(generalMinimumStay),
            "generalMinimumPrice": {
                "amount": parseInt(generalMinimumPriceAmount),
                "currency": generalMinimumPriceCurrency,
            },
            "active": active,
            "apartmentType": apartmentType,
            "photos": allPhotos,
            "facilities": allFacilities,
        }
        try {
            const res: IApartment = await Post(
                apiRoute.getRoute('apartment'),
                obj,
            );
        } catch (e) {
            console.log(e.message);
            
        }

        console.log(obj);
      }

    return (
        <Container maxWidth="sm">
            <Typography className={heading} variant="h3">
            Create apartment
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter latitude"
                type="number"
                fullWidth
                required
                name="lat"
                value={lat}
                onChange={(e) => handleInputChange(e, setLat)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter longitude"
                type="number"
                fullWidth
                required
                name="lng"
                value={lng}
                onChange={(e) => handleInputChange(e, setLng)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter maximum number of persons"
                type="number"
                fullWidth
                required
                name="maxPersons"
                value={maxPersons}
                onChange={(e) => handleInputChange(e, setMaxPersons)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter minimum stay in nights"
                type="number"
                fullWidth
                required
                name="minStay"
                value={generalMinimumStay}
                onChange={(e) => handleInputChange(e, setGeneralMinimumStay)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter minimum price amount"
                type="number"
                fullWidth
                required
                name="amount"
                value={generalMinimumPriceAmount}
                onChange={(e) => handleInputChange(e, setGeneralMinimumPriceAmount)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter price currency"
                type="text"
                fullWidth
                required
                name="currency"
                value={generalMinimumPriceCurrency}
                onChange={(e) => handleInputChange(e, setGeneralMinimumPriceCurrency)}
            />
            <Typography variant='body1'>
                Active
            </Typography>
            <Checkbox checked={active} onChange={handleActiveChange} />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter apartment type"
                type="text"
                fullWidth
                required
                name="position"
                value={apartmentType}
                onChange={(e) => handleInputChange(e, setApartmentType)}
            />
            <Typography variant='h4'>
                Photos
            </Typography>
            {allPhotos.length > 0 && (
                <>
                  {allPhotos.map((field, index) => (
                    <Col xs="4">
                      <div className="add-player-div">
                        <Typography variant="h6">Photo {index + 1}</Typography>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter URL"
                            type="text"
                            fullWidth
                            required
                            name="url"
                            value={field.url}
                            onChange={(event) =>
                              handlePhotosInputChange(index, event)
                            }
                          />
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter position"
                            type="number"
                            fullWidth
                            required
                            name="position"
                            value={field.position}
                            onChange={(event) =>
                              handlePhotosInputChange(index, event)
                            }
                          />
                        <Button
                          onClick={() => handleRemovePhoto(index)}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={submitButton}
                        >
                          Cancel photo
                        </Button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
              <br/>
                  <Button
                    onClick={() => handleAddPhotos()}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add new photo
                  </Button>
                  <Typography variant='h4'>
                Facilities
            </Typography>
            {allFacilities.length > 0 && (
                <>
                  {allFacilities.map((field, index) => (
                    <Col xs="4">
                      <div className="add-player-div">
                        <Typography variant="h6">Facility {index + 1}</Typography>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter facility name"
                            type="text"
                            fullWidth
                            required
                            name="name"
                            value={field.name}
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                        <Button
                          onClick={() => handleRemoveFacilities(index)}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={submitButton}
                        >
                          Cancel facility
                        </Button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
              <br/>
                  <Button
                    onClick={() => handleAddFacilities()}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add new facility
                  </Button>
                  <br />
                  <br />
                  <Button
                    onClick={() => handleSubmit()}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Create apartment
                  </Button>
        </Container>
    )
}

export default CreateApartment;
