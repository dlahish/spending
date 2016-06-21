import React, { Component } from 'react';
import Dropzone from './uploadnew';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';


export default class Upp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file : []
    }
  }

  componentWillUpdate() {
    let images = this.getStore(ProductsStore).getNewImages();
    let csrf = this.getStore(ApplicationStore).token;
    let url = '/images/upload';
    let requests = [];
    let promise;
    let self = this;
    _.each(images, function(img){

      if(!img.name || img.name.length == 0) return;

      promise = request
        .post(url)
        .field('name', img.name)
        .field('altText', img.altText)
        .field('caption', img.caption)
        .field('size', img.size)
        .attach('image', img.file, img.file.name)
        .set('Accept', 'application/json')
        .set('x-csrf-token', csrf)
        .on('progress', function(e) {
          console.log('Percentage done: ', e.percent);
        })
        .promise()
        .then(function(res){
          var newImg = res.body.result;
          newImg.id = img.id;
          self.executeAction(savedNewImageAction, newImg);
        })
        .catch(function(err){
          self.executeAction(savedNewImageErrorAction, err.res.body.errors);
        });
      requests.push(promise);
    });

    Promise
      .all(requests)
      .then(function(){
        console.log('all done');
      })
      .catch(function(){
        console.log('done with errors');
      });
  }

  onAddFile(res) {
    console.log('onAddFile');
    var newFile = {
      //id:uuid(),
      name:res.file.name,
      size: res.file.size,
      altText:'',
      caption: '',
      file:res.file,
      url:res.imageUrl
    };
    this.setState({ file: newFile });
  }

  render() {
    return(
      <Dropzone onDropp={this.onAddFile}>
        <p>Drag &amp; drop files here or click here to browse for files.</p>
      </Dropzone>
    );
  }
}
