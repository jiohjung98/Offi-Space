import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react';
import { writePostType } from '../mock/writePostType';
import useDebounce from '../hooks/useDebounce';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

interface WritePostContentType {
  setPostData: Dispatch<React.SetStateAction<Partial<writePostType>>>;
}

const WritePostContent = ({ setPostData }: WritePostContentType) => {
  const [textValue, setTextValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const swiperRef = useRef<SwiperClass | null>(null);

  const debouncedTitle = useDebounce(textValue, 800);

  const fileChange = (fileBlob: File) => {
    if (fileBlob) {
      setPostData((prev) => ({
        ...prev,
        images: [...(prev.images ?? []), fileBlob]
      }));
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      if (reader.result) {
        setPreviewImg((prev) => [...prev, reader.result as string]);
      }
    };
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleDelete = (index: number) => {
    const newImg = previewImg.filter((_, i) => i !== index);
    setPreviewImg(newImg);

    setPostData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      contents: debouncedTitle
    }));
  }, [debouncedTitle, setPostData]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '210px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue]);

  useEffect(() => {
    if (swiperRef.current) {
      const index = previewImg.length - 1;
      if (index !== -1) {
        swiperRef.current.slideTo(index);
      }
    }
  }, [previewImg]);

  return (
    <div className="border-b border-gray-200">
      <header className="py-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-900">내용</div>
        <label
          htmlFor="picture"
          className="cursor-pointer w-8 h-8 rounded border-2 border-gray-500 flex justify-center items-center">
          <img src="/community/picture.svg" alt="" />
        </label>
        <input
          type="file"
          className="hidden"
          id="picture"
          accept="image/*"
          onChange={(e) => e.target.files && fileChange(e.target.files[0])}
        />
      </header>
      <main>
        <textarea
          className="w-full outline-none resize-none overflow-hidden"
          placeholder="내용을 입력해주세요."
          ref={textareaRef}
          value={textValue}
          onChange={handleChange}
        />
      </main>
      <div className="h-[200px] mb-4">
        <Swiper
          onSwiper={(swiper: SwiperClass) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={12}
          className="mySwiper">
          {previewImg.map((item, i) => (
            <SwiperSlide className="max-w-max" key={i}>
              <div className="w-[160px] h-[200px] relative">
                <img src={item} alt="" className="w-full h-full object-cover" />
              </div>
              <img
                src="/community/deleteImg.svg"
                alt=""
                className="absolute z-50 top-2 right-2 cursor-pointer"
                onClick={() => handleDelete(i)} // 인덱스와 아이템을 전달합니다.
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WritePostContent;
