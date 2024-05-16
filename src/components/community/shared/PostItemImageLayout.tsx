import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItemImageItem from './PostItemImageItem';

export default function PostItemImageLayout({ postImage }: { postImage: string[] }) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        // centeredSlides={true}
        spaceBetween={12}
        className="mySwiper mt-3">
        {postImage.map((image, i) => (
          <SwiperSlide key={i} className="max-w-max">
            <PostItemImageItem image={image} count={postImage.length} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
