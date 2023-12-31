import React from 'react'
import { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizonalScrollbar from './HorizonalScrollbar';


const SearchExercises = ({setExercises, setBodyPart,bodyPart}) => {
    const [search,setSearch]=useState('')

    
    const [bodyParts,setBodyParts]=useState([])

    useEffect(()=>{
      const fetchExercisesData=async()=>{
        try {
          let bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
    
          if (Array.isArray(bodyPartsData)) {
            setBodyParts(['all', ...bodyPartsData]);
          } else {
            console.error('bodyPartsData is not an array:', bodyPartsData);
          }
        } catch (error) {
          console.error('Error fetching body parts data:', error);
        }
      };
      fetchExercisesData();
    }, [setBodyParts]);
        
        
      
    

    const handleSearch= async()=>{
        if(search){
          const exerciseData= await fetchData('https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions);
          
          const searchedExercises= exerciseData.filter(
            (exercise)=>exercise.name.toLowerCase().includes(search) 
            || exercise.target.toLowerCase().includes(search)
            || exercise.equipment.toLowerCase().includes(search)
            || exercise.bodyPart.toLowerCase().includes(search)
            || exercise.name.toLowerCase().includes(search)
          ); 
          setSearch('');
          setExercises(searchedExercises);
        }
    }
  
  return (
    <Stack alignItems="center" mt="37 px"
    justifyContent="center" p="20px">
      <Typography fontWeight={700}
      sx={{fontSize:{lg:'44px', xs:"30px"}}}
      mb="50px" textAlign="center">
        Awesome Exercises You<br/> Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
        sx={{justifyContent:"center",
            input:{fontWeight:"700px",
            border:"none",
            borderRadius:"4px"
        },width:{lg:"800px",xs:"350px"},
        backgroundColor:"#fff",
        borderRadius:"40px"
    }}          
        height="76px"
        value={search}
        onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}
        placeholder='Search Exercises'
        type='text'>

        </TextField>
        <Button className='search-btn' onClick={handleSearch}
        sx={{
            bgcolor:'#ff2625',
            color:"#fff",
            textTransform:'none',
            width:{lg:"175px", xs:"100px"},
            fontSize:{lg:"20px",xs:"14px"},
            height:"56px",
            position:"absolute",
            right:"0"
        
        }}
        >Search</Button>
      </Box>
        <Box sx={{position:'relative',width:"100%",p:"20px"}}>
        <HorizonalScrollbar data={bodyParts} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart}
        isBodyParts/>

        </Box>


    </Stack>
  )
}

export default SearchExercises
