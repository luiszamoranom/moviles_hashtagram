import { Box, Skeleton, Stack } from '@mui/material';

export const NotificationSkeleton = () => {
  return (
    <Stack direction="row" alignItems="center" gap={2} px="1rem">
      {/* Skeleton de la imagen */}
      <Skeleton 
        variant="circular" 
        width="2.5rem" 
        height="2.5rem" 
      />
      
      {/* Skeleton del texto */}
      <Box sx={{ flex: 1 }}>
        <Skeleton 
          variant="text" 
          width="100%" 
          height="4rem" 
          sx={{ fontSize: '1rem' }} 
        />
      </Box>

      {/* Skeleton del botón */}
      <Skeleton 
        variant="circular" 
        width="2rem" 
        height="2rem" 
      />
    </Stack>
  )
}