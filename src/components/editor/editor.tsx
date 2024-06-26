/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import type EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useForm } from "react-hook-form";
import TextareaAutoSize from "react-textarea-autosize";

// import { uploadFiles } from '@/lib/uploadthing'
import { PostValidator, type PostCreationRequest } from "~/lib/validators/post";
import { toast } from "~/hooks/use-toast";

type EditorProps = {
  communityId: number;
};

const Editor: React.FC<EditorProps> = ({ communityId }) => {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      communityId,
      title: "",
      content: null,
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          // image: {
          //   class: ImageTool,
          //   config: {
          //     uploader: {
          //       async uploadByFile(file: File) {
          //         const [res] = await uploadFiles({
          //           files: [file],
          //           endpoint: 'imageUploader'
          //         })

          //         return {
          //           success: 1,
          //           file: {
          //             url: res?.url
          //           }
          //         }
          //       }
          //     }
          //   }
          // },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        // Set focus to title
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      void init();

      return () => {
        editorRef.current?.destroy();
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      communityId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        communityId,
      };

      const data = await ky
        .post("/api/community/post/create", {
          json: payload,
        })
        .json<string>();

      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Your post not published, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");

      window.location.assign(newPathname);

      return toast({
        title: "Success",
        description: "Your post has been published.",
      });
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await editorRef.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      communityId,
    };

    createPost(payload);
  }

  const { ref: titleRef, ...rest } = register("title");

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-gray-500 bg-neutral p-4 text-neutral-content">
      <form
        id="community-form-post"
        className="w-fit"
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      >
        <article className="prose">
          <TextareaAutoSize
            ref={(e) => {
              titleRef(e);

              _titleRef.current = e;
            }}
            {...rest}
            placeholder="title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />

          <div id="editor" className="min-h-[500px]" />
        </article>
      </form>
    </div>
  );
};

export default Editor;
