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
  FormHelperText
} from '@chakra-ui/react'

import { Logo } from '../components'
import firebase, { persistenceMode } from '../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório')
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
      firebase.auth().setPersistence(persistenceMode)

      try {
        const user = await firebase.auth().signInWithEmailAndPassword(
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

      <Box p={4}>
        <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
      </Box>
    </Box>

    Ainda não tem uma conta? <Link href="/signup">Cadastre-se!</Link>
  </Container>
}
