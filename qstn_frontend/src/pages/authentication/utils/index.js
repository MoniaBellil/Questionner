/* this utils file will take charge of defining schemas for register and login forms*/

//handle form
import * as yup from 'yup';


const registerSchema = yup.object().shape({
    fullName:yup.string().required('Please enter your Full name.'),
	email: yup.string().email('Email address provided is not valid').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password must contain at least  6 characters.')
});


const loginSchema = yup.object().shape({
	email: yup.string().email('Email address provided is not valid').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password must contain at least  6 characters.')
});


export  {
    registerSchema,
    loginSchema
}