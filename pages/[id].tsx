import { GetStaticPaths } from "next";
import { supabase } from "../utils/supabase";
import { Lesson } from "../types";

export default function LessonDetails({ lesson }: { lesson: Lesson }) {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("id");

  return {
    paths: lessons!.map((lesson) => ({
      params: { id: lesson.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", params.id)
    .single();

  return {
    props: {
      lesson,
    },
  };
};
