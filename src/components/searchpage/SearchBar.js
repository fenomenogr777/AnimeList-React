import { Button, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getQuery } from '../../store'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar() {
   const dispatch = useDispatch()

   const [animeName, setAnimeName] = useState('')

   // HANDLES
   const handleChange = e => {
      const { value } = e.target
      setAnimeName(value)
   }
   const handleSubmit = e => {
      e.preventDefault()
      dispatch(getQuery(animeName))
      setAnimeName('')
   }

   // JSX
   return (
      <form
         onSubmit={handleSubmit}
         style={{
            display: 'flex',
            backgroundColor: '#ccf381',
         }}
      >
         <TextField
            sx={{
               padding: '0',
               backgroundColor: '#3a27aa',
               border: '1px solid #ccf381',
            }}
            placeholder='Search Anime...'
            size='small'
            value={animeName}
            onChange={handleChange}
            variant='outlined'
            InputProps={{
               startAdornment: (
                  <InputAdornment position='start'>
                     <SearchIcon color='primary' />
                  </InputAdornment>
               ),
            }}
         />
      </form>
   )
}
export default SearchBar
