import React, { useState, useEffect, useCallback } from 'react';
import searchStyle from '../css/searchStyle.css';
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { searchPhoto } from '../api/axios.js'
import PhotoCard from '../components/PhotoCard.js'


function SearchBox(props) {
	
	const [searchItem, setSearchItem] = useState("");
	const [photos, setPhotos] = useState([]);
	const [isPhotoEmpty, setIsPhotoEmpty] = useState(false); // 검색 결과의 존재 여부를 판단하는 변수.
	
	const [photoIdx, setPhotoIdx] = useState(0); // 무한 스크롤 구현을 위해 가져올 데이터의 인덱스를 관리한다.
	const [photoBucket, setPhotoBucket] = useState([]); // 9개 씩 사진을 담을 변수.
	
	const [isTopBtnShow, setIsTopBtnShow] = useState(false); // top 버튼을 보여줄지 말지 결정한다.
		
	const onSearchItemHandler = (event) => {
		setSearchItem(event.target.value);
		//console.log("**********");
		//console.log(event.target);
		//console.log(event.currentTarget);
	}
	
	
	
	useEffect ( () => {
		// 초기에 보여줄 데이터 항목을 지정한다.
		async function initData () {
			let res = await searchPhoto("galaxy");
			setPhotoBucket(res.data.collection.items.slice(0, 9));
		}
		
		initData();
		// 초기 데이터는 초기 화면과 검색 결과가 없을 때 보여져야 한다.
	}, [isPhotoEmpty]);
	
	const getSearch = async () => {
		// 검색어를 입력하지 않았을 때 400 에러가 발생하므로 미리 방지한다.
		if(searchItem===""){
			alert("탐색할 단어를 입력해주세요.");
		}
		
		else {
			try {
				let res = await searchPhoto(searchItem);
				
				if(res.data.collection.items.length === 0){
					alert('탐색 결과 발견한 미디어가 존재하지 않습니다 💨');
					// 결과가 없을 경우 다시 초기 데이터 로드를 위해 isPhotoEmpty 값을 변경한다.
					setIsPhotoEmpty(true);
				}
				setPhotos(res.data.collection.items);
				setPhotoBucket(res.data.collection.items.slice(0, 9));
				
			} catch(e) {
				console.log(e);
			}
			setSearchItem("");
		}
	}
	
	const photoIsEmpty = () => {
		setIsPhotoEmpty(false);
	}
	
	
	const infiniteScroll = useCallback(() => {
		let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		let clientHeight = document.documentElement.clientHeight;
		
		if(scrollTop + clientHeight >= scrollHeight) {
			// 소수점으로 표현되어 딱 맞아떨어지지 않는 경우가 있어 크거나 같은 경우로 판단한다.
			setPhotoIdx(photoIdx + 9);
			setPhotoBucket(photoBucket.concat(photos.slice(photoIdx, photoIdx + 9)));
		}
	}, [photoIdx, photoBucket]);
	
	useEffect(() => {
		window.addEventListener('scroll', infiniteScroll, true);
		// 바로 clean up 한다.
		return () => {
			window.removeEventListener('scroll', infiniteScroll, true);
		}
	}, [infiniteScroll]);
	
	
	
	const scrolling = () => {
		// scroll이 일정 부분 움직이면 top 버튼을 활성화한다.
		let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		if(scrollTop > 600) {
			setIsTopBtnShow(true);
		}
		else setIsTopBtnShow(false);
	}
	
	useEffect(() => {
		window.addEventListener('scroll', scrolling);
		return () => {
			window.removeEventListener('scroll', scrolling);
		}
	})
	
	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
		setIsTopBtnShow(false);
	}
	
	
	return (
		<div className="container">

			<InputGroup className="mb-3">
				<FormControl
					id="searchItem" onChange={onSearchItemHandler} placeholder="NASA의 미디어 탐사를 시작해보세요. 예를 들면 'Galaxy'?"
				/>
				<Button onClick={getSearch} variant="dark" id="button-addon2">발사🚀</Button>
  			</InputGroup>
			
			{
				isPhotoEmpty ? photoIsEmpty() : null
			}
			
			<Row xs={1} sm={2} md={3} className="g-4">
				{photoBucket.map((photo, id) => (
					<Col>
						<PhotoCard photo = {photo} key={id}></PhotoCard>
					</Col>
				))}
			</Row>
			
			{
				isTopBtnShow ? <Button className='top-button' onClick={scrollToTop} variant="dark">위로!</Button> : null
			}
			
		</div>
	
	)
}

export default SearchBox;