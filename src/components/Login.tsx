import { Component } from 'react'
import { AppDispatch } from 'app/store'
import { setLogin } from 'features/login/loginSlice'
import { login, LoginUserError } from 'features/login/loginApi'
import { connect } from 'react-redux'
import axios, { AxiosError } from 'axios'

import { Formik } from 'formik'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('올바르지 않은 이메일 형식입니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자리 이상이여야 합니다.')
    .matches(/[a-zA-Z0-9]/, '비밀번호는 문자 또는 숫자를 포함해야합니다.'),
})

interface LoginState {
  email: string
  password: string
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>
type Props = DispatchProps

class Login extends Component<Props, LoginState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <Formik
        validationSchema={schema}
        onSubmit={async (formData, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          await login(formData)
            .then((response) => {
              const { dispatch } = this.props
              // const token = response.data.token
              dispatch(setLogin(true))
            })
            .catch((e) => {
              if (axios.isAxiosError(e)) {
                const loginUserError = e as AxiosError<LoginUserError>
                if (loginUserError && loginUserError.response) {
                  toast.error(loginUserError.response.data.error)
                }
              }
            })
          setSubmitting(false)
        }}
        initialValues={this.state}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <div className="container-small w-50 mx-auto p-4 shadow bg-body rounded">
            <div className="text-center">
              <h2>Login</h2>
            </div>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && errors.email === undefined}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && errors.password === undefined}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button className="col-12" type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Spinner
                    as="span"
                    className="me-2"
                    size="sm"
                    animation="border"
                  />
                )}
                로그인
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatch,
})

export default connect(null, mapDispatchToProps)(Login)
