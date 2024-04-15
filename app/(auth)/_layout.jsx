import React from 'react';
import { Stack } from 'expo-router';

function Authlayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Authlayout;
