import React, { useEffect, useState } from "react";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { itemData } from "./imageData";
import { useStyles, useImageStyle } from "./style";
import { randomNumber } from "../../helpers/numberUltils";
import { storage, ref, listAll, getDownloadURL } from "../../firebase/index";
import { async } from "@firebase/util";

export default function BasicImageList({folderPic}) {
  const classes = useStyles();
  const [imageList, setImageList] = useState([]);
  const imageStyleClass = useImageStyle();

  

  // const fetchImages = async(folderName) => {
  //   let images = await getImageList(folderName);
  //   setImageList([...images]);
  // }

  useEffect(() => {
    const getImageList = async (folderName) => {
      const listRef = ref(storage, folderName);
        await listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
          });
  
          res.items.forEach((itemRef) => {
            const imageRef = ref(storage, `${folderName}/${itemRef.name}`);
            getDownloadURL(imageRef).then((url) => {
              setImageList(images => [...images, url]);
            })
          });
        }).catch((error) => {
          console.log(error);
        });
    }

    getImageList(folderPic);
  }, [folderPic])

  const renderSinggleImageList = (imageList) => {
    if(imageList.length === 1) {
      return(
        <div className={classes.root}>
        <ImageList className={classes.imageList} cols={3}>
            <ImageListItem style={{width: "100%", height: "unset", padding: "2px"}} key={randomNumber(0, 10000)} cols={3}>
              <img style={{height: "994px"}} src={imageList[0]} alt="" />
            </ImageListItem>
        </ImageList>
      </div>
    )
    }
    else {
      return <div></div>
    }
    
  };

  const renderImageList = (imageList) => {
    return(
      <div className={classes.root}>  
        <ImageList rowHeight={250} className={classes.imageList} cols={3}>
          {imageList.map((item, index) => (
            <ImageListItem key={randomNumber(0,10000)} cols={index % 2 === 0 ? 1 : 2}>
              <img src={item} alt=""/>
            </ImageListItem>
          ))}
        </ImageList>
  
      </div>
    )
  };

  
  return(
    imageList.length > 1 ? renderImageList(imageList) : renderSinggleImageList(imageList)
  )
  

  
}
  
