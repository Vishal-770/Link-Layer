"use client";

import { AddNewUrl } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";

const URLInput = () => {
  const { data: session, isPending } = authClient.useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ originalUrl: string; customSlug: string }>();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: { originalUrl: string; customSlug?: string }) =>
      AddNewUrl(data.originalUrl, data.customSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      reset();
      toast.success("URL shortened successfully", {
        description: "Your link is ready to share!",
      });
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message =
        axiosError.response?.data?.message || "Please check the URL and try again";
      toast.error("Failed to shorten URL", {
        description: message,
      });
    },
  });

  const onSubmit = (data: { originalUrl: string; customSlug?: string }) => {
    if (isPending || !session?.user) return;
    createMutation.mutate({
      originalUrl: data.originalUrl,
      customSlug: data.customSlug,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Shorten Infrastructure
        </h3>
        <p className="text-[10px] font-medium text-muted-foreground uppercase opacity-70">
          Provision a new redirection unit for your workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="text"
              placeholder="https://your-long-url.com/destination"
              disabled={isPending || createMutation.status === "pending"}
              className="h-11 flex-[2] rounded-md bg-muted/30 border-border/50 shadow-none focus-visible:ring-primary/20"
              {...register("originalUrl", {
                required: "URL is required",
                pattern: {
                  value:
                    /^(https?:\/\/)(localhost|(\d{1,3}\.){3}\d{1,3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/.*)?$/i,
                  message: "Must start with http:// or https://",
                },
              })}
            />
            <Input
              type="text"
              placeholder="custom-slug (optional)"
              disabled={isPending || createMutation.status === "pending"}
              className="h-11 flex-1 rounded-md bg-muted/30 border-border/50 shadow-none focus-visible:ring-primary/20"
              {...register("customSlug", {
                pattern: {
                  value: /^[a-zA-Z0-9-]*$/,
                  message: "Only letters, numbers, and hyphens",
                },
              })}
            />
            <Button
              type="submit"
              disabled={
                isPending ||
                !session?.user ||
                createMutation.status === "pending" ||
                !isValid
              }
              className="h-11 w-full rounded-md px-8 font-bold sm:w-auto shadow-none"
            >
              {createMutation.status === "pending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wait...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Shorten
                </>
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            {errors.originalUrl && (
              <p className="px-1 text-[10px] font-bold text-destructive uppercase tracking-widest">
                {errors.originalUrl.message}
              </p>
            )}
            {errors.customSlug && (
              <p className="px-1 text-[10px] font-bold text-destructive uppercase tracking-widest">
                {errors.customSlug.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default URLInput;
