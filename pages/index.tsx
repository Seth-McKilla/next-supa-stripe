import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import { Lesson } from "../types";

export default function Home({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return {
    props: {
      lessons,
    },
  };
};
