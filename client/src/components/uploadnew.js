import React, { Component } from 'react';
import _ from 'lodash';

export default class Dropzone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file : [],
      isDragActive: false
    }
  }

  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: React.PropTypes.object
  }

  onDragLeave(e) {
    this.setState({
      isDragActive: false
    });
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    this.setState({
      isDragActive: true
    });
  }

  onDrop(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    _.each(files, this._createPreview);
  }

  onClick() {
    this.refs.fileInput.click();
  }

  _createPreview(file){
    var self = this
      , newFile
      , reader = new FileReader();

    reader.onloadend = function(e){
      newFile = {file:file, imageUrl:e.target.result};
      if (self.props.onDrop) {
        self.props.onDrop(newFile);
      }
    };

    reader.readAsDataURL(file);
  }

  render() {

    var className = 'dropzone';
    if (this.state.isDragActive) {
      className += ' active';
    };

    var style = {
      width: this.props.size || 100,
      height: this.props.size || 100,
      borderStyle: this.state.isDragActive ? 'solid' : 'dashed'
    };

    return (
      <div className={className} onClick={this.onClick} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
        <input style={{display: 'block' }} type='file' multiple ref='fileInput' onChange={this.onDrop} />
        {this.props.children}
      </div>
    );
  }

};
