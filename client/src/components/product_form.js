import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';

class ProductForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {name, description, price, image}, handleSubmit, resetForm, submitting, error} = this.props;

    return (
      <div className="product_form">
        <div className="inner">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label className="control-label"> Name </label>
              <input type="text" className="form-control" {...name} />
              {name.touched && name.error && <div className="col-xs-3 help-block">{name.error}</div>}
            </div>

            <div className="form-group">
              <label className="control-label"> Description </label>
              <input type="textarea" className="form-control" {...description} />
              {description.touched && description.error && <div className="col-xs-3 help-block">{description.error}</div>}
            </div>

            <div className="form-group">
              <label className="control-label"> Price </label>
              <input type="number" step="any" className="form-control" {...price} />
              {price.touched && price.error && <div className="col-xs-3 help-block">{price.error}</div>}
            </div>

            <div className="form-group">
              <label className="control-label"> Image </label>
              <input type="file" className="form-control" {...image} value={ null } />
              {image.touched && image.error && <div className="col-xs-3 help-block">{image.error}</div>}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ProductForm = reduxForm({
  form: 'new_product_form',
  fields: ['name', 'description', 'price', 'image']
})(ProductForm);

export default ProductForm;
