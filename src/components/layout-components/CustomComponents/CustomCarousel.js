import React, {useRef} from "react";
import {Carousel, Button} from "antd";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const CustomCarousel = (props)=>{
  const carouselRef = useRef()

  const onNext = ()=>{
    carouselRef.current?.next()
  }

  const onPrev = ()=>{
    carouselRef.current?.prev()
  }

  return(
    <div style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <Button size={"small"} icon={<LeftOutlined/>} onClick={onPrev}/>
      <Carousel ref={carouselRef} style={{width: 180}}>{props.children}</Carousel>
      <Button size={"small"} icon={<RightOutlined/>} onClick={onNext}/>

    </div>
  )
}

export default CustomCarousel
