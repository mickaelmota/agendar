import Link from 'next/link'
import { useFormik, yupToFormErrors } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
  InputGroup
} from '@chakra-ui/react'

import { Logo } from '../components'
import firebase from '../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
})

export default function Home() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (value, form) => {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(
          values.email, values.password
        )
        console.log(user)
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  return <Container p={4} centerContent>
    <Logo />

    <Box p={4} mt={8}>
      <Text>Crie sua agenda compartilhada</Text>
    </Box>

    <Box>
      <FormControl id="email" p={4} isRequired>
        <FormLabel>Email</FormLabel>
        <Input size="lg" placeholder="Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
      </FormControl>

      <FormControl id="password" p={4} isRequired>
        <FormLabel>Senha</FormLabel>
        <Input size="lg" placeholder="Senha" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
        {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
      </FormControl>

      <FormControl id="username" p={4} isRequired>
        <InputGroup size="lg">
          <InputLeftAddon children="agendar.work/" />
          <Input size="lg" placeholder="Usuário" type="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
        </InputGroup>
        {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
      </FormControl>
      <Box p={4}>
        <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
      </Box>
    </Box>

    Já tem uma conta? <Link color="teal.500" href="/">Faça login!</Link>
  </Container>
}
