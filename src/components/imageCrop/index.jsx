import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Image from 'react-bootstrap/Image';

const inputStyle = {
    background:"#00b0f0",
    color:"#FFF",
    width: "100%"
};

const imageStyle={
    maxWidth:"50%",
};

class ImageCrop extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      height:100,
      width: 100,
      aspect: 9 / 9
    }
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    let pms = this.makeClientCrop(crop);
    console.log(pms);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    this.setState({ crop: percentCrop });
    // this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const [croppedImageUrl,blob] = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      this.props.getAvatar(blob);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve([this.fileUrl,blob]);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div>
        <div>
          <input type="file" onChange={this.onSelectFile} style={inputStyle} accept="image/*"/>
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            style={imageStyle}
          />
        )}
        {croppedImageUrl && (
            <Image alt="Crop" src={croppedImageUrl} roundedCircle style={imageStyle}/>
        )}
      </div>
    );
  }
}

export default ImageCrop;