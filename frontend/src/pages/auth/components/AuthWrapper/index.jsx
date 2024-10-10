import { Box, Container, Text } from "@chakra-ui/react"

function AuthWrapper({ children }) {
      return (
      <Container maxW="xl" centerContent>
            <Box d="flex" justifyContent="center" p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg"  maxW='sm' borderWidth='1px'>
                  <Text fontSize="4xl" fontFamily="work sans" textAlign="center">Talk-A-Tive</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                  {children}
            </Box>
    </Container>)
}

export default AuthWrapper