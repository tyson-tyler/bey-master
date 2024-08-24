"use client";

import { z } from "zod";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  prompt: z.string().min(2),
});

export default function StoryGenerator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // GSAP animation for the textarea on mount
    if (textareaRef.current) {
      gsap.fromTo(
        textareaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await axios.post("/api/story", {
        prompt: values.prompt,
      });
      console.log(values);

      if (res.status === 200) {
        const storyId = res.data.storyId;
        router.push(`library/story/${storyId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <div className="mt-20 lg:mt-24 w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-md shadow-lg">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Generate Your Story
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      autoFocus
                      {...field}
                      ref={textareaRef}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg p-4 rounded-lg resize-none transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-12"
                      placeholder="Write a prompt to generate a story..."
                      rows={6}
                    />
                    <Button
                      disabled={!form.formState.isValid || loading}
                      type="submit"
                      size="icon"
                      className="absolute bottom-3 right-3 bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 transition-all rounded-full p-2"
                    >
                      {loading ? (
                        <Loader2Icon className="size-8 text-white animate-spin" />
                      ) : (
                        <ArrowRightIcon className="size-8 text-white" />
                      )}
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
