"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().min(1, "Firm is required"),
  email: z.string().email("Valid email required"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function IdentityModal({ open, onClose }: Props) {
  const setIdentity = useStore((s) => s.setIdentity);
  const identity = useStore((s) => s.identity);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: identity?.name ?? "",
      firm: identity?.firm ?? "",
      email: identity?.email ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIdentity(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Welcome to SF 330 Builder
          </DialogTitle>
          <DialogDescription>
            Enter your information once. It will be saved locally and pre-fill
            fields across your documents.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" {...register("name")} placeholder="Jane Smith" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="firm">Firm / Organization</Label>
            <Input
              id="firm"
              {...register("firm")}
              placeholder="Smith Engineering LLC"
            />
            {errors.firm && (
              <p className="text-sm text-destructive">{errors.firm.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="jane@smithengineering.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="flex gap-2 pt-2 justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>
              Skip for now
            </Button>
            <Button type="submit">Save &amp; Continue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
