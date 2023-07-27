import React from 'react'
import { useState, useEffect } from 'react'
import { Await, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { fetchData, exerciseOptions } from '../utils/fetchData'
import { Details } from '@mui/icons-material';
import Detail from './Detail';
import ExerciseVideos from './ExerciseVideos';
import SimilarExercises from './SimilarExercises'



const ExerciseDetails = () => {
  
  const [exerciseDetail, setExerciseDetail]=useState({})
  const {id}=useParams();

  useEffect(()=>{
      const fetchExercisesData=async ()=>{
        const exerciseDbUrl='https://exercisedb.p.rapidapi.com';
        const youtudeSearchUrl='https://youtube-search-and-download.p.rapidapi.com'

        const exerciseDetailData= await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions);
        setExerciseDetail(exerciseDetailData);
        
      }

      fetchExercisesData();
  },[id])
  
  


  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos/>
      <SimilarExercises/>

    </Box>
  )
}

export default ExerciseDetails
