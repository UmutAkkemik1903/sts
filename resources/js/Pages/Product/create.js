import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from 'react';
import Layout from "../../Components/Layout/front_layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import Select from "react-select";
import axios from "axios";
import ImageUploader from 'react-images-upload';
import CKEditor from 'ckeditor4-react';

const Create = (props) => {
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [property, setProperty] = useState([]);

    useEffect(() => {
        axios.get(`/api/product/create`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setCategories(res.data.categories);
        }).catch(e => console.log(e))
    }, [images])


    const handleSubmit = (values,{ resetForm,setSubmitting }) => {
            const data = new FormData();

            images.forEach((image_file) => {
                data.append('file[]',image_file);
            });

            data.append('categoryId',values.categoryId);
            data.append('name',values.name);
            data.append('modelCode',values.modelCode);
            data.append('barcode',values.barcode);
            data.append('brand',values.brand);
            data.append('tax',values.tax);
            data.append('stock',values.stock);
            data.append('sellingPrice',values.sellingPrice);
            data.append('buyingPrice',values.buyingPrice);
            data.append('text',values.text);
            data.append('property',JSON.stringify(property));

            const config = {
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
                }
            }

            axios.post('/api/product',data,config).then((res)=>{
                if(res.data.success){
                    toastr.success('Kayıt Eklendi','Ürün')
                    resetForm({});
                    setImages([]);
                    setProperty([]);
                    setSubmitting(false)
                }
                else
                {
                    toastr.warning('Kayıt Eklenemedi','Ürün')
                    swal(res.data.message);
                }
            }).catch(e => console.log(e));
    };

    const newProperty = () => {

        setProperty([...property, {property: '', value: ''}]);
    };

    const removeProperty = (index) => {
        const OldProperty = property;
        OldProperty.splice(index,1);
        setProperty([...OldProperty]);
    }

    const changeTextInput = (event,index) => {
        property[index][event.target.name] = event.target.value;
        setProperty([...property]);
    }

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            categoryId:'',
                            name:'',
                            modelCode:'',
                            barcode:'',
                            brand:'',
                            stock:0,
                            tax:0,
                            buyingPrice:'',
                            sellingPrice:'',
                            text:'',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                categoryId:Yup.number().required('Kategori Seçimi Zorunludur'),
                                name:Yup.string().required('Ürün Adı Zorunludur'),
                                modelCode:Yup.string().required('Ürün Model Kodu Zorunludur'),
                                barcode:Yup.string().required('Ürün Barkodu Zorunludur'),
                                brand:Yup.string().required('Ürün Markası Zorunludur'),
                                buyingPrice:Yup.number().required('Ürün Alış Fiyatı Zorunludur'),
                                sellingPrice:Yup.number().required('Ürün Satış Fiyatı Zorunludur'),

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

                                <div className="row">
                                    <div className="col-md-12">
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Resim Ekle'
                                            onChange={(picturesFiles) => setImages(images.concat(picturesFiles))}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withPreview={true}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Select
                                                onChange={(e) => setFieldValue('categoryId' ,e.id)}
                                                placeholder="Ürün kategorisi seçiniz"
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.id}
                                                options={categories}/>
                                        </div>
                                        {(errors.categoryId && touched.categoryId) && <p className="form-error">{errors.categoryId}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Ürün Adı *"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Ürün Model Kodu *"
                                            value={values.modelCode}
                                            handleChange={handleChange('modelCode')}
                                        />
                                        {(errors.modelCode && touched.modelCode) &&
                                        <p className="form-error">{errors.modelCode}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Barkod *"
                                            value={values.barcode}
                                            handleChange={handleChange('barcode')}
                                        />
                                        {(errors.barcode && touched.barcode) &&
                                        <p className="form-error">{errors.barcode}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Marka *"
                                            value={values.brand}
                                            handleChange={handleChange('brand')}
                                        />
                                        {(errors.brand && touched.brand) &&
                                        <p className="form-error">{errors.brand}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Stok"
                                            type="number"
                                            value={values.stock}
                                            handleChange={handleChange('stock')}
                                        />
                                        {(errors.stock && touched.stock) &&
                                        <p className="form-error">{errors.stock}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="KDV"
                                            value={values.tax}
                                            handleChange={handleChange('tax')}
                                        />
                                        {(errors.tax && touched.tax) && <p>{errors.tax}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Alış Fiyatı *"
                                            type="number"
                                            value={values.buyingPrice}
                                            handleChange={handleChange('buyingPrice')}
                                        />
                                        {(errors.buyingPrice && touched.buyingPrice) &&
                                        <p className="form-error">{errors.buyingPrice}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Satış Fiyatı *"
                                            type="number"
                                            value={values.sellingPrice}
                                            handleChange={handleChange('sellingPrice')}
                                        />
                                        {(errors.sellingPrice && touched.sellingPrice) &&
                                        <p className="form-error">{errors.sellingPrice}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CKEditor
                                            data={values.text}
                                            onChange={(event) => {
                                                const data = event.editor.getData();
                                                setFieldValue('text', data);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="button" onClick={newProperty}
                                                className="btn btn-primary mt-2">Yeni Özellik
                                        </button>
                                    </div>

                                </div>
                                {
                                    property.map((item,index) => (
                                        <div className="row mb-1">
                                            <div className="col-md-5">
                                                <label>Özellik adı:</label>
                                                <input type="text" className="form-control" name="property"
                                                       onChange={(event) => changeTextInput(event, index)}
                                                       value={item.property}/>
                                            </div>
                                            <div className="col-md-5">
                                                <label>Özellik Değeri:</label>
                                                <input type="text" className="form-control" name="value"
                                                       onChange={(event) => changeTextInput(event, index)}
                                                       value={item.value}/>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'flex-end'
                                            }}
                                                 className="col-md-1">
                                                <button onClick={() => removeProperty(index)} type="button"
                                                        className="btn btn-danger">X
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
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
