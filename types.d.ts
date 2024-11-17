import { LucideIcon } from "lucide-react";
import React from "react";
import { Doc, Id } from "./convex/_generated/dataModel";

export type NavigationItemProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  isDocument?: boolean;
};

export type IconPickerProps = {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
};

export type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};

export type EditorProps = {
  editable?: boolean;
  initialContent?: string;
  onChange?: (data: string) => void;
}

export type DocumentIdPageProps = {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
};

export type PublishProps = {
  initialData: Doc<"documents">;
}

export declare namespace UIModal {
  type ConfirmModalProps = {
    children: React.ReactNode;
    onConfirm: () => void;
  };
}


export declare namespace UITitle {
  type MainTitleProps = {
    initialData: Doc<"documents">;
  };
}

export declare namespace CustomHooks {
  type useSearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
  };

  type useSettingsStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };

  type useCoverImageStore = {
    url?: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void;
  }
}

export declare namespace UIToolbar {
  type ToolbarProps = {
    initialData: Doc<"documents">;
    preview?: boolean;
  };
  // add other types
}

export declare namespace UINavbar {
  type NavbarMainProps = {
    isCollapsed: boolean;
    onResetWidth: () => void;
  };
  // add other types
}

export declare namespace UIBanner {
  type BannerProps = {
    documentId: Id<"documents">;
  };
  // add other types
}

export declare namespace UIMenu {
  type MainMenuProps = {
    documentId: Id<"documents">;
  };
  // add other types
}
