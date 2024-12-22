"use client";

import { Dialog } from "@/components/ui/dialog";

export default function SignUpLayout({ children }) {
  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          window.history.back();
        }
      }}
    >
      {children}
    </Dialog>
  );
}
