import {
  BarChart2,
  ChartSpline,
  Check,
  Copy,
  CornerDownRight,
  ExternalLink,
  Link2,
  QrCode,
  Pencil,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DeleteButton from "./DeleteButton";
import Qrcode from "./Qrcode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUrlSlug } from "@/services/service";

interface URL {
  _id: string;
  originalUrl: string;
  slug: string;
  qrCode: string;
  visitHistory?: { date: string }[];
  createdAt: string;
}

const URLCard = ({ url }: { url: URL }) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(url.slug);
  const queryClient = useQueryClient();

  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${url.slug}`;

  const updateSlugMutation = useMutation({
    mutationFn: () => UpdateUrlSlug(url._id, newSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      setIsEditing(false);
      toast.success("Slug updated successfully");
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to update slug";
      toast.error(message);
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(text);
    setTimeout(() => setCopiedSlug(null), 2000);
    toast.success("Copied to clipboard");
  };

  const handleUpdateSlug = () => {
    if (newSlug.trim() === url.slug) {
      setIsEditing(false);
      return;
    }
    updateSlugMutation.mutate();
  };

  return (
    <div className="group border-b border-border/50 py-6 last:border-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="rounded-sm border-secondary/20 bg-secondary/5 text-[9px] font-black uppercase tracking-widest text-secondary px-2 py-0.5 shadow-none">
              Short Link
            </Badge>
            <span className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
               Created on {new Date(url.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-2">
             <div className="flex items-center gap-3">
               <div className="flex h-7 w-7 items-center justify-center rounded bg-muted/50 text-muted-foreground">
                  <CornerDownRight className="h-3.5 w-3.5" />
               </div>
               <a
                 href={url.originalUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="truncate text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                 title={url.originalUrl}
               >
                 {url.originalUrl}
               </a>
             </div>

             <div className="flex items-center gap-3">
               <div className="flex h-7 w-7 items-center justify-center rounded bg-secondary/10 text-secondary">
                  <ExternalLink className="h-3.5 w-3.5" />
               </div>
               <div className="flex items-center gap-2">
                 <Link
                   href={`/r/${url.slug}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="truncate text-base font-bold text-secondary tracking-tight hover:underline"
                   prefetch={false}
                 >
                   {shortUrl}
                 </Link>
                 <button
                   onClick={() => copyToClipboard(shortUrl)}
                   className="ml-1 rounded-md p-1.5 transition-colors hover:bg-muted active:opacity-50"
                   aria-label="Copy to clipboard"
                 >
                   {copiedSlug === shortUrl ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground/40" />
                    )}
                 </button>
               </div>
             </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
              <BarChart2 className="h-3.5 w-3.5" />
              {url.visitHistory?.length || 0} Total Clicks
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                <Link2 className="h-3.5 w-3.5" />
                Slug:
              </div>
              
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="h-7 w-40 text-[10px] font-mono uppercase"
                    disabled={updateSlugMutation.status === "pending"}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={handleUpdateSlug}
                    disabled={updateSlugMutation.status === "pending"}
                  >
                    {updateSlugMutation.status === "pending" ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Check className="h-3 w-3 text-emerald-500" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => {
                      setIsEditing(false);
                      setNewSlug(url.slug);
                    }}
                    disabled={updateSlugMutation.status === "pending"}
                  >
                    <X className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-foreground opacity-80">{url.slug}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-md p-1 hover:bg-muted transition-colors opacity-40 hover:opacity-100"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-start gap-4">
          <Qrcode qrCode={url.qrCode} />

          <Link href={`/dashboard/url/${url.slug}/qr`}>
            <Button variant="outline" size="sm" className="h-10 rounded-md px-6 font-bold border-border/50 shadow-none hover:bg-muted transition-colors">
              <QrCode className="mr-2 h-4 w-4 text-secondary" />
              Design QR
            </Button>
          </Link>

          <Link href={`/dashboard/analyze?slug=${url.slug}`}>
            <Button variant="outline" size="sm" className="h-10 rounded-md px-6 font-bold border-border/50 shadow-none hover:bg-muted transition-colors">
              <ChartSpline className="mr-2 h-4 w-4 text-secondary" />
              Insights
            </Button>
          </Link>

          <DeleteButton slug={url.slug} />
        </div>
      </div>
    </div>
  );
};

export default URLCard;
