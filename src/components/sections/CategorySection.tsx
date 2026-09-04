'use client';

import Image from 'next/image';

const categories = [
    {
        title: 'Casino Review',
        image: '/images/categories/casino-review.png',
    },
    {
        title: 'Newest Casino',
        image: '/images/categories/newest-casino.png',
    },
    {
        title: 'Video Casino ',
        image: '/images/categories/video-casino.png',
    },
    {
        title: 'Casino Bonuses',
        image: '/images/categories/casino-bonuses.png',
    },

    {
        title: 'Mobile Casinos',
        image: '/images/categories/mobile-casino.png',
    },
    {
        title: 'Instant Pay',
        image: '/images/categories/instant-pay.png',
    },
];

export default function CategorySection() {
    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[28px] font-bold text-[#1F2937]">
                    Categories
                </h2>


            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                    <div
                        key={category.title}
                        className="
             w-full max-w-[180px]
             h-auto aspect-[180/238]
               rounded-[14px]
               border
               border-white/40
               bg-[#FFFFFFB2]
               p-[8px]
               shadow-[0px_4px_16px_rgba(38,123,220,0.08)]
               mx-auto
             "
                    >
                        {/* Inner Card */}
                       <div
   className="rounded-[16px] p-[1px] h-full"
   style={{
     background:
       'linear-gradient(158.37deg, #FF9C2C 2.3%, #FFF1CC 15.9%, #B45B1B 24.24%, #FFC170 62.4%, #FEE5B3 75.76%, #9F5E26 90.07%)',
   }}
>
   <div
     className="
       relative
       flex
       h-full
       w-full
       flex-col
       items-center
       justify-between
       rounded-[15px]
       p-3
     "
    style={{
      background:
        'linear-gradient(206.44deg, #D5EDFF 23.88%, #EEECFF 40.33%, #F9F3FF 54.84%, #F5FCFF 74.19%, #E9F5FF 93.53%)',
    }}
  >
    {/* Image */}
    <div className="relative flex flex-1 items-center justify-center w-full">
      <Image
        src={category.image}
        alt={category.title}
        width={173}
        height={173}
        className="object-contain"
      />
    </div>

    {/* Title */}
    <div className="w-full rounded-full bg-white/80 py-2 text-center text-[14px] font-medium text-[#1E293B] shadow-sm">
      {category.title}
    </div>
  </div>
</div>
                    </div>
                ))}
            </div>
        </section>
    );
}