import React from 'react'
import { useState } from 'react';
import { Box } from '@mui/material';
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import Herobanner from '../components/Herobanner';

const Home = () => {
  
  const [exercises,setExercises]=useState([]);
  const [bodyPart, setBodyPart]=useState('all') ;

  console.log(bodyPart)
  
  return (
    
    <Box>
      <Herobanner/>
        <SearchExercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}/>
        
        <Exercises setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}/>
      
    </Box>
  )
}

export default Home
