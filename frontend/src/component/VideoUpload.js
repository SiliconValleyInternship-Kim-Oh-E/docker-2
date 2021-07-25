import React, {useState} from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import {Form} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Loading from './Loading'


<meta name="viewport" content="width=device-width, initial-scale=1.0" />

const Botton = styled.button`
    width: 90%;
    color: white;
    font-size: 3rem;
    margin-top: 20px;
    @media screen and (max-width: 800px){
        font-size: 2rem;
    }
    @media screen and (max-width: 550px){
        font-size: 1rem;
    }
    @media screen and (max-width: 430px){
        width: 70%;
        margin-left: 15%;
        margin-top: 4%;
        margin-right: 15%;
        font-size: 0.8rem;
    }
    background-color: black;
    border: 0rem;
    border-radius: 1rem;
    text-align: center;
    text-decoration-line: none;
    font-family: 'Do Hyeon';
    box-shadow: 0.1rem 0.2rem 0 rgb(0,0,0,0.5);
    &:hover {
        background: var(--button-hover-bg-color, #404040);
    }
    &:active {
        box-shadow: 0rem 0rem 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }

`
const StReactPlayer = styled(ReactPlayer)`
    @media screen and (max-width: 800px){
        width: 80% !important;
        height: 60% !important;
    }
    @media screen and (max-width: 550px){
        width: 80% !important;
        height: 60% !important;
    }
    @media screen and (max-width: 400px){
        width: 80% !important;
        height: 60% !important;
    }
    width: 80% !important;
    height: 60% !important;
    margin: auto;
`

const SelectBt = styled(Botton)`
`
const UploadBt = styled(Botton)`
    float: right;
`

const StDropzone = styled(Dropzone)`
`

const StLink = styled(Link)`
    width: 100%;
`

const Box = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    @media screen and (max-width: 430px){
        display: inline;
    }
`

const VideoUpload = () => {
    const [uploadedurl, setUploadedurl] = useState(null)        //video url
    const [controlState, setControlState] = useState(false)     //video control
    const [name,setName] = useState(null)                       //video file name
    const [loading,setLoading] = useState(false)                // Loading Component state
    const [llink,setLlink] = useState('/')                      //routing link
    const onDrop = (files) => {
        setLoading(true)
        let formData = new FormData()
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        axios.post('http://localhost:5000/fileUpload', formData, config)
        .then((response) => {
            setLoading(false)
            setUploadedurl(URL.createObjectURL(files[0]))
            setControlState(true)
            const tempname = JSON.stringify(response.data,['name'],0)
            const tempname2 = JSON.parse(tempname).name
            setName(tempname2)
            setLlink('/result')
        }).catch(err=>{setLoading(true);})
    }

    return (
    <Form  onSubmit>
        <StReactPlayer url={uploadedurl} controls={controlState}></StReactPlayer>
        {loading ? <Loading/> : <p>{name}</p>}
        <Box>
            <StDropzone
                accept='video/*'
                onDrop={onDrop}
                multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                maxSize={100000000}    // 최대 사이즈 
            >
            {({getRootProps, getInputProps}) => (
                <SelectBt {...getRootProps()}>
                파일 선택
                <input {...getInputProps()}/>
                </SelectBt>
            )}
            </StDropzone>
            <StLink to= {{pathname: llink, aboutProps: {name}}}> 
                <UploadBt >인물 태깅</UploadBt>
            </StLink>
        </Box>
    </Form> 
    )
}

export default VideoUpload;
