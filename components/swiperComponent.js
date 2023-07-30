import { delay } from 'framer-motion';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperComponent({ children }) {
    return (
        <div >
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                spaceBetween={10}

            >
                <SwiperSlide>
                    <div className='grid place-items-center h-[100vh]'>
                        <div className='w-[400px] h-[400px] absolute bg-opacity-40 rounded-full bg-[#B2F4D3]'>
                        </div>
                        <div className='text-[96px] font-bold'>
                            DE-VAC
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='grid place-items-center h-[100vh]'>
                        <div className='grid space-y-10'>
                            <div className='text-xl font-bold text grid place-items-center opacity-80'>
                                FIND HOSPITALS NEAR YOU
                            </div>
                            <Image src={'/map.png'} width={400} height={400} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-full">
                        <div className="absolute z-10">
                            <Image
                                src="/vaccine.jpg"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                        <div> KNOW VACCINE AVAILABILITY </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>

    )
}