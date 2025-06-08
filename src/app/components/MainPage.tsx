import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MainPage() {
  return (
    <section className="relative overflow-hidden bg-black text-white w-full">
      <div className="w-full">
        <div className="relative z-10 grid lg:grid-cols-2 lg:items-center">
          <div className="pl-[50px] pr-[50px] py-16 space-y-6 sm:pl-[60px] lg:pl-[80px]">
            <h1 className="text-4xl font-roboto tracking-tighter sm:text-5xl xl:text-6xl/none">
              Robert NFT Shop: Journey into the Realm of Animals World
            </h1>
            <p className="max-w-[600px] text-lg text-zinc-300 sm:text-xl font-roboto text-justify">
            The animal world is a spectacle of breathtaking beauty, a vibrant tapestry woven with diverse forms and behaviors. 
            From the delicate flutter of butterfly wings to the powerful grace of a leaping dolphin, nature artistry is on full display. 
            The iridescent plumage of exotic birds, the intricate patterns of coral reefs, and the majestic sweep of a lion mane all contribute 
            to a world of awe-inspiring wonder, reminding us of the planet extraordinary diversity.
            </p>
            <Link href="/shop">
              <button className="inline-flex items-center px-6 py-3 mt-4 text-lg font-roboto bg-red-600 hover:bg-blue-700 rounded-md">
                Visit My Shop
                <ArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
          <div className="relative h-full min-h-[100px] lg:min-h-[200px]">
            <div className="inset-0 bg-gradient-to-r from-black to-transparent z-10" />
            <Image
              src="/img/market.png"
              alt="Digital Innovation"
              fill
              className=" object-left-top"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full opacity-20 blur-[100px]" />
    </section>
  );
}
