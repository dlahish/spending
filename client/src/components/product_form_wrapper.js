import React from 'react';
import { connect } from 'react-redux';
//import Actions                 from '../actions/products';
import * as form_actions            from 'redux-form';
import ProductForm from './product_form';
import httpPostForm from './utils';

class ProductFormContainer extends React.Component {
  _handleSubmit(values) {
    return new Promise((resolve, reject) => {
      let form_data = new FormData();

      Object.keys(values).forEach((key) => {
        if (values[key] instanceof FileList) {
          form_data.append(`product[${key}]`, values[key][0], values[key][0].name);
        } else {
          form_data.append(`product[${key}]`, values[key]);
        }
      });

      formData.append('username', 'Chris');

      console.log('form_data:');
      console.log(form_data);

      httpPostForm(`http://localhost:3090/upload`, form_data)
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          let responce = {};
          Object.keys(json.errors).map((key) => {
            Object.assign(responce, {[key] : json.errors[key]});
          });

          if (json.errors) {
            reject({...responce, _error: 'Login failed!'});
          } else {
            reject({_error: 'Something went wrong!'});
          };
        });
      });
    });
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h2> New product </h2>
        <ProductForm title="Add product" onSubmit={this._handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default connect()(ProductFormContainer);
