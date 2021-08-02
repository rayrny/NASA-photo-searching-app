import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, CloseButton } from "react-bootstrap";
import LinesEllipsis from 'react-lines-ellipsis'


function PhotoCard(props) {
	
	const [photo, setPhoto] = useState([]);
	const [src, setSrc] = useState("");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	
	const [isModalShow, setIsModalShow] = useState(false);
	const [isBtnShow, setIsBtnShow] = useState(false);

	
	const showModal = () => {
		setIsModalShow(true);
	}
	
	const closeModal = () => {
		setIsModalShow(false);
	}
	
	useEffect(() => {
		// props에서 필요한 정보를 저장한다.
		
		setPhoto(props.photo);
		
		if(photo.data && photo.data.length > 0) {
			// data를 검증한 후에 접근한다.
			
			setTitle(photo.data[0].title);
			setDate(photo.data[0].date_created);	
			setDescription(photo.data[0].description);
		}
		
		if(photo.links && photo.links.length > 0){
			// links를 검증한 후에 접근한다.
			
			setSrc(photo.links[0].href);
		}
	});
	
	
	return (
		<div className="photo-card">
			
			<Card bg="dark" text="white" style={{ width: '17.5rem' }} className='photo-card'>
  				<Card.Img variant="top" src={src} />
  				<Card.Body style={{ overflow: 'hidden' }}>
    				<Card.Title>{title}</Card.Title>
    				<Card.Text className='card-text'>
						Date: {date}<hr />
						<LinesEllipsis
  							text={description}
  							maxLine='3'
  							ellipsis='...'
  							trimRight
  							basedOn='letters'
						/>
					</Card.Text>
					{
						description.length > 90 ? 
							<Button  variant="outline-light" size="sm" onClick={showModal}>See more!</Button> : null
					}
					
  				</Card.Body>
			</Card>
			
			<Modal show={isModalShow} onHide={closeModal}>
        		<Modal.Header>
          			<Modal.Title>{title}</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>{description}</Modal.Body>
				<Modal.Footer>
          			<Button variant="secondary" onClick={closeModal}>닫기</Button>
				</Modal.Footer>
      		</Modal>
			
		
		</div>
	)
}

export default PhotoCard;