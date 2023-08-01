import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Helmet} from "react-helmet";

const Login = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                return props.history.push('/');
            }
        }
    });

    const handleSubmit = (values) => {
        axios.post('/api/auth/login',{...values})
            .then((res) => {
                if (res.data.success){
                    const userData = {
                        id:res.data.id,
                        name:res.data.name,
                        email:res.data.email,
                        access_token:res.data.access_token

                    };
                    const appState = {
                        isLoggedIn:true,
                        user:userData
                    };
                    props.AuthStore.saveToken(appState);
                    //props.history.push('/');
                    window.location.reload();
                } else {
                    alert('Giriş yapılamadı');
                }
            })
            .catch(error => {
                if (error.response){
                    let err = error.response.data;
                    if (err.errors){
                        setErrors(err.errors)
                    }
                    else {
                        setError(error.response.data.message);
                    }

                    //alert(err.errors)
                }
                else if(error.request){
                    let err = error.request;
                    setError(err);
                }
                else
                {
                    setError(error.message)
                }
            });
    }
    let arr = [];
    Object.values(errors).forEach(value => {
        arr.push(value)
    });
    return (
        <div style={{minWidth: 340, textAlign: 'center', marginTop: 250}}>
            <Helmet>
                <title>Stok Giriş</title>
            </Helmet>
            <form className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Stok Giriş</h1>
                { arr.length != 0 && arr.map((item) => (<p>{item}</p>))}
                { error != 0 && (<p>{error}</p>)}
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup
                                .string()
                                .email('Email formatı hatalı')
                                .required('Email zorunludur'),
                            password: Yup.string().required('Şifre zorunludur'),
                        })
                    }
                >
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          errors,
                          isValid,
                          isSubmitting,
                          touched
                      }) => (

                        <div>
                            <div className="form-group">
                                <input type="email"
                                       className="form-control mt-3"
                                       placeholder="Email"
                                       name="email"
                                       onBlur={handleBlur}
                                       value={values.email}
                                       onChange={handleChange('email')}
                                />
                                {(errors.email && touched.email) && <p>{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control mt-3"
                                       placeholder="Şifre"
                                       name="password"
                                       onBlur={handleBlur}
                                       value={values.password}
                                       onChange={handleChange('password')}
                                />
                                {(errors.password && touched.password) && <p>{errors.password}</p>}
                            </div>
                            <button
                                disabled={!isValid || isSubmitting}
                                onClick={handleSubmit}
                                style={{minWidth: 300}} className="btn btn-lg btn-primary btn-block"
                                type="button">Giriş Yap
                            </button>
                        </div>
                    )}
                </Formik>
                <Link className="mt-3" style={{display: 'block'}} to={"/register"}>Kayıt ol</Link>
                <p className="mt-5 mb-3 text-muted">© 2021-2022</p>
            </form>
        </div>
    )
}

export default inject("AuthStore")(observer(Login));
