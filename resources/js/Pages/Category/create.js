import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from 'react';
import Layout from "../../Components/Layout/front_layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import axios from "axios";


const Create = (props) => {

    const handleSubmit = (values,{ resetForm, setSubmitting }) => {
        const data = new FormData();

        data.append('name',values.name);
        const config = {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }

        axios.post('/api/category',data,config).then((res)=>{
            if(res.data.success){
                resetForm({});
                setSubmitting(false);
                toastr.success('Kayıt eklendi','Kategori');
            }
            else
            {
                toastr.warning('Kayıt Güncellenemedi','Kategori')
                swal(res.data.message);
            }
        }).catch(e => console.log(e));
    };
    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            name:'',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                name:Yup.string().required('Kategori Adı Zorunludur'),
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
                              setFieldValue,
                              touched
                          }) => (

                            <div>
                                    <div className="col-md-12">
                                        <CustomInput
                                            title="Kategori Adı *"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}
                                    </div>
                                <button

                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    style={{minWidth: 300}} className="btn btn-lg btn-primary btn-block mt-3"
                                    type="button">Ekle
                                </button>
                            </div>

                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
};

export default inject("AuthStore")(observer(Create));
