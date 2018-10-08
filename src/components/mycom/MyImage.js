import React from 'react';
import {storage} from '../../reducer/Firestore';


class MyImage extends React.Component {
          
    componentDidMount() {
        const img = this.img;

        storage.child('userPhoto/'+this.props.src).getDownloadURL()
            .then(function(url) {
                img.src = url;
            }).catch(function(error) {
                
                console.log(error);
            });
    }
    render() {
      const { src, className } = this.props;
      return (
            <img src={src} alt="..." ref={(node) => this.img = node} className={className}/>
      )
    }
}

export default MyImage;
