import { Box, Container, Text } from "@chakra-ui/react"

function AuthWrapper({ children }) {
      return (
      <Container bg="grey.900" maxW="xl" display="flex" alignItems="center" justifyContent="center">
            <Box width="md">
                  <Box display="flex" justifyContent="center" p={3} bg="white" w="100%" borderRadius="lg" borderWidth='1px'>
                        <Text fontSize="4xl" fontFamily="work sans" textAlign="center">Talk-A-Tive</Text>
                  </Box>
                  <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                        {children}
                  </Box>
            </Box>
    </Container>)
}

export default AuthWrapper