import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItemImageItem from './PostItemImageItem';

export default function PostItemImageLayout({
  postImage
}: {
  postImage: string[] | undefined;
}) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        // centeredSlides={true}
        spaceBetween={8}
        className="mySwiper mt-3">
        {postImage?.map((image, i) => (
          <SwiperSlide key={i} className="max-w-max z-1">
            <PostItemImageItem image={image} count={postImage.length} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
